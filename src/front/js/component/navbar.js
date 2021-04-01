import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.scss";
import LogoiPadel from "../component/logoiPadel.jsx";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light">
			<Link to="/">
				<span className="iPadel ">
					<LogoiPadel />
				</span>
				<p className="slogan">padel social network </p>
			</Link>

			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary">Check the Context in action</button>
				</Link>
			</div>
		</nav>
	);
};
