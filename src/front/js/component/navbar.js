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
	console.log(user);
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Link className="navbar-brand" to="/">
				<span className="iPadel ">
					<LogoiPadel />
				</span>
				<p className="slogan">padel social network </p>
			</Link>

			{/* {user ? ( */}
			<div className="userExists">
				<Navbar.Toggle aria-controls="responsive-navbar-nav " />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Link className="nav-link" to="/pistas">
						Pistas
					</Link>
					<Link className="nav-link" to="/mired">
						Mi Red
					</Link>
					<Nav.Link href="#features">Mis Reservas</Nav.Link>
					<Link className="nav-link" to="/newcenter">
						Alta Centros Deportivos
					</Link>
					<Link className="nav-link" to="/configure-courts">
						Configurar centro
					</Link>
					<Link className="nav-link" to="/choose-center">
						Reservar Pista
					</Link>
					<Link className="nav-link" to="/forgot">
						Recuperar Contraseña
					</Link>
					<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
						<Link className="dropdown-item" to="/configure-profile">
							Editar Perfil
						</Link>
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
					</NavDropdown>
				</Navbar.Collapse>
			</div>
			{/* ) : ( */}
			<Nav className="ml-auto">
				<Link className="nav-link" to="/sign">
					Sign Up
				</Link>
				<Link className="nav-link" to="/login">
					Login
				</Link>
			</Nav>
			{/* )} */}
		</Navbar>
	);
}
