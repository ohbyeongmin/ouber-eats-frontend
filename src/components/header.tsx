import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React from "react";
import { useMe } from "../hooks/useMe";
import ouberLogo from "../images/logo.svg";

export const Header: React.FC = () => {
	const { data } = useMe();
	return (
		<header className="py-4">
			<div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
				<img src={ouberLogo} className="w-24 " alt="Ouber Eats" />
				<span className="text-xs">
					<Link to="/my-profile">
						<FontAwesomeIcon
							icon={faUser}
							className="text-xl"
						></FontAwesomeIcon>
					</Link>
				</span>
			</div>
		</header>
	);
};
