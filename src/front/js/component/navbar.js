import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Nav";
import LinkContainer from "react-bootstrap/Nav";
import "../../styles/navbar.scss";
import LogoiPadel from "../component/logoiPadel.jsx";

export default function Mynavbar() {
	const { actions, store } = useContext(Context);

	let user = actions.getUser();
	let loginDone = false;

	if (user === null || user.msg != "") {
		loginDone = false;
	} else loginDone = true;

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand href="#home">
				<Link to="/">
					<span className="iPadel ">
						<LogoiPadel />
					</span>
					<p className="slogan">padel social network </p>
				</Link>
			</Navbar.Brand>

			{loginDone ? (
				<div Classname="userExists">
					<Navbar.Toggle aria-controls="responsive-navbar-nav " />
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

						<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
							<Link to="/configure-profile">
								<NavDropdown.Item href="#action/3.1">Editar Perfil</NavDropdown.Item>
							</Link>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
						</NavDropdown>
					</Navbar.Collapse>
				</div>
			) : (
				<Nav className="ml-auto">
					<Link to="/sign">
						<Nav.Link href="#pricing">Sign Up</Nav.Link>
					</Link>
					<Nav.Link href="#deets">login</Nav.Link>
				</Nav>
			)}
		</Navbar>
	);
}
