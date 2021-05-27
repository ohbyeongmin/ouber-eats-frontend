import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";

const ClientRoutes = [
	<Route path="/" exact>
		<Restaurants />
	</Route>,
];

export const LoggedInRouter = () => {
	const { data, loading, error } = useMe();
	if (!data || loading || error) {
		return (
			<div className="h-screen flex justify-center items-center">
				<span className="font-medium text-xl tracking-wide">loading...</span>
			</div>
		);
	}
	return (
		<Router>
			<Header />
			<Switch>
				{data.me.role === "Client" && ClientRoutes}
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</Router>
	);
};
