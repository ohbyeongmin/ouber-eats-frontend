import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
	loginMutation,
	loginMutationVariables,
} from "../__generated__/loginMutation";
import { LoginInput } from "../__generated__/globalTypes";

const LOGIN_MUTATION = gql`
	mutation loginMutation($loginInput: LoginInput!) {
		login(input: $loginInput) {
			ok
			token
			error
		}
	}
`;

export const Login = () => {
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>();
	const onCompleted = (data: loginMutation) => {
		const {
			login: { ok, token },
		} = data;
		if (ok) {
			console.log(token);
		}
	};
	const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
		loginMutation,
		loginMutationVariables
	>(LOGIN_MUTATION, {
		onCompleted,
	});
	const onSubmit = () => {
		if (!loading) {
			const { email, password } = getValues();
			loginMutation({
				variables: {
					loginInput: {
						email,
						password,
					},
				},
			});
		}
	};
	return (
		<div className="h-screen flex items-center justify-center bg-gray-800">
			<div className="bg-white w-full max-w-lg pt-10 pb-7 py-10 rounded-lg text-center">
				<h3 className="text-3xl text-gray-800">Log In</h3>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="grid gap-3 mt-5 px-5"
				>
					<input
						{...register("email", { required: "Email is required" })}
						type="email"
						required
						placeholder="Email"
						className="input"
					/>
					{errors.email?.message && (
						<FormError errorMessage={errors.email?.message} />
					)}
					<input
						{...register("password", {
							required: "Password is required",
							minLength: 10,
						})}
						type="password"
						required
						placeholder="Password"
						className="input"
					/>
					{errors.password?.message && (
						<FormError errorMessage={errors.password?.message} />
					)}
					{errors.password?.type === "minLength" && (
						<FormError errorMessage="Password must be more than 10 chars" />
					)}
					<button className="mt-3 btn">
						{loading ? "Lodaing..." : "Log In"}
					</button>
					{loginMutationResult?.login.error && (
						<FormError errorMessage={loginMutationResult.login.error} />
					)}
				</form>
			</div>
		</div>
	);
};
