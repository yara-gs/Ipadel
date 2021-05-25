import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Nav";
import LinkContainer from "react-bootstrap/Nav";
import "../../styles/navbar.scss";
import LogoiPadel from "../component/logoiPadel.jsx";

export default function Mynavbar() {
	const { actions, store } = useContext(Context);
	const [userImage, setUserImage] = useState("");

	let user = actions.getUser();
	let loginDone = false;
	let show_userImage = false;
	let user_urlImage_bck = "https://www.w3schools.com/w3images/avatar2.png";

	if (user === null || user.msg != "") {
		loginDone = false;
	} else loginDone = true;

	useEffect(() => {
		if (user) {
			if (user.url_image !== "") {
				setUserImage(user.url_image);
			}
		}
	}, []);

	if (user) {
		if (userImage === "") {
			setUserImage("https://www.w3schools.com/w3images/avatar2.png");
		}
		if (user.url_image !== "" && userImage !== user.url_image) {
			setUserImage(user.url_image);
		}
	}

	return (
		<Navbar className="fixed-top" collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Link className="navbar-brand" to="/">
				<span className="iPadel ">
					<LogoiPadel />
				</span>
				<p className="slogan">padel social network </p>
			</Link>

			{loginDone ? (
				<div className="userExists">
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Link to="/mired">
							<Nav.Link href="#features">Mi Red</Nav.Link>
						</Link>

						<Link to="/my-reservations">
							<Nav.Link href="#features">Mis Reservas</Nav.Link>
						</Link>
						<Link to="/choose-center">
							<Nav.Link href="#features">Reservar Pista</Nav.Link>
						</Link>
						<Link to="/centers">
							<Nav.Link href="#features">Mis Centros</Nav.Link>
						</Link>
						<Link to="/newcenter">
							<Nav.Link href="#features">Alta Centros Deportivos</Nav.Link>
						</Link>
						<Nav.Link href="#features" style={{ opacity: "0" }}>
							Alta Centros Deportivos
						</Nav.Link>
						<Nav.Link href="#features" style={{ opacity: "0" }}>
							Alta Centros deportiv
						</Nav.Link>

						<div className="avatar collapse navbar-collapse " id="navbar-list-4">
							<ul className="avatar1 navbar-nav">
								<li className="avatar2 nav-item dropdown">
									<a
										className="nav-link dropdown-toggle "
										href="#"
										id="navbarDropdownMenuLink"
										role="button"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false">
										<div
											className="user-image"
											style={{
												backgroundImage: `url(${userImage})`,
												width: "40px",
												height: "40px"
											}}
										/>
									</a>
									<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
										<Link to="/configure-profile">
											<a className="dropdown-item" href="#">
												Edit Profile
											</a>
										</Link>
										<a className="dropdown-item" href="#">
											Log Out
										</a>
									</div>
								</li>
							</ul>
						</div>
					</Navbar.Collapse>
				</div>
			) : (
				<Nav className="ml-auto">
					<Link to="/sign">
						<Nav.Link href="#pricing">Sign Up</Nav.Link>
					</Link>
					<Nav.Link href="/login">login</Nav.Link>
				</Nav>
			)}
		</Navbar>
	);
}
