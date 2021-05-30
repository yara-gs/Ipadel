import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Nav";
import LinkContainer from "react-bootstrap/Nav";
import "../../styles/navbar.scss";
import LogoiPadel from "../component/logoiPadel.jsx";

import pushSignPage from "../pushSignPage";

export default function Mynavbar() {
	const { actions, store } = useContext(Context);
	const [userImage, setUserImage] = useState("");

	let user = actions.getUser();
	let loginDone = false;
	let show_userImage = false;
	let user_urlImage_bck = "https://www.w3schools.com/w3images/avatar2.png";

	// funcion que lleva a sign si no hay usario logueado
	pushSignPage();

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
			{/* <Navbar.Brand className="navbar-brand" href="ipadelBrand">
				<Link to="/">
					<Nav.Link href="#home" className="iPadel ">
						<LogoiPadel />

						<p className="slogan">padel social network </p>
					</Nav.Link>
				</Link>
			</Navbar.Brand> */}

			<Link className="navbar-brand" to="/">
				<span className="iPadel ">
					<LogoiPadel />
				</span>
				<p className="slogan">padel social network </p>
			</Link>

			{loginDone ? (
				<Navbar.Collapse id="responsive-navbar-nav">
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Nav className="userExists mr-auto">
						<Link to="/mired">
							<Nav.Link href="#mired">Mi Red</Nav.Link>
						</Link>
						<Link to="/choose-center">
							<Nav.Link href="#reservecourt">Reservar Pista</Nav.Link>
						</Link>

						<Link to="/my-reservations">
							<Nav.Link href="#misreservations">Mis Reservas</Nav.Link>
						</Link>

						<Link to="/centers">
							<Nav.Link href="#centers">Mis Centros</Nav.Link>
						</Link>
						<Link to="/newcenter">
							<Nav.Link href="#newcenter">Alta Nuevo Centro</Nav.Link>
						</Link>
					</Nav>

					<Nav className="userExists ml-auto mr-2">
						<NavDropdown className=" navbar-collapse " id="navbar-list-4">
							<NavDropdown.Item>
								<Link to="/configure-profile">Edit Profile</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link
									to="/sign"
									onClick={() => {
										actions.logOut();
									}}>
									Cerrar Sesión
								</Link>
							</NavDropdown.Item>
						</NavDropdown>
						<Navbar.Brand className="mr-2" href="useravatar">
							<div
								className="user-image"
								style={{
									backgroundImage: `url(${userImage})`,
									width: "50px",
									height: "50px"
								}}
							/>
						</Navbar.Brand>
					</Nav>
				</Navbar.Collapse>
			) : (
				<Nav className="ml-auto">
					<Link to="/sign">
						<Nav.Link href="#sign">Crear Cuenta</Nav.Link>
					</Link>
					<Link to="/login">
						<Nav.Link href="#login">Login</Nav.Link>
					</Link>
				</Nav>
			)}
		</Navbar>
	);
}
