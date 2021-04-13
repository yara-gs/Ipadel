import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Nav";
import LinkContainer from "react-bootstrap/Nav";
import "../../styles/navbar.scss";
import LogoiPadel from "../component/logoiPadel.jsx";

export default function Mynavbar() {
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
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Link to="/home2">
					<Nav.Link href="#features">Home2</Nav.Link>
				</Link>
				<Link to="/pistas">
					<Nav.Link href="#features">Pistas</Nav.Link>
				</Link>
				<Link to="/mired">
					<Nav.Link href="#features">Mi Red</Nav.Link>
				</Link>
				<Nav.Link href="#features">Mis Reservas</Nav.Link>
				<Nav className="ml-auto">
					<Link to="/sign">
						<Nav.Link href="#pricing">Sign Up</Nav.Link>
					</Link>
					<Nav.Link href="#deets">login</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
