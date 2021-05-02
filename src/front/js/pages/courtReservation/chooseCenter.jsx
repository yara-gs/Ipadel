import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";

import CenterAvailable from "../../component/courtReservation/centerAvailable.jsx";
import "../../../styles/court-reservation.scss";

import pushSignPage from "../../pushSignPage";

export default function ChooseCenter() {
	const { actions, store } = useContext(Context);
	const history = useHistory();

	//funcion que lleva a sign si no hay usario logueado
	// pushSignPage();

	// Get the Sidebar
	var mySidebar = document.getElementById("mySidebar");

	// Get the DIV with overlay effect
	var overlayBg = document.getElementById("myOverlay");

	// Toggle between showing and hiding the sidebar, and add overlay effect
	function w3_open() {
		if (mySidebar.style.display === "block") {
			mySidebar.style.display = "none";
			overlayBg.style.display = "none";
		} else {
			mySidebar.style.display = "block";
			overlayBg.style.display = "block";
		}
	}

	// Close the sidebar with the close button
	function w3_close() {
		mySidebar.style.display = "none";
		overlayBg.style.display = "none";
	}

	return (
		<div>
			{/* <!-- Sidebar/menu --> */}
			<nav className="w3-sidebar w3-light-grey w3-collapse w3-white w3-animate-left" id="mySidebar">
				<div className="w3-container w3-display-container w3-padding-16">
					<i onClick="w3_close()" className="fa fa-remove w3-hide-large w3-button w3-transparent t" />
					<h3>Reservar Pista</h3>

					<hr />

					<form>
						<p>
							<label>
								<i className="fa fa-calendar-check-o" /> Localidad
							</label>
						</p>
						<input
							className="w3-input w3-border"
							type="text"
							placeholder="Localidad"
							name="Localidad"
							required
						/>
						<p>
							<label>
								<i className="fa fa-calendar-o" /> Fecha
							</label>
						</p>
						<input
							className="w3-input w3-border"
							type="text"
							placeholder="DD MM YYYY"
							name="CheckOut"
							required
						/>
						<p>
							<label>
								<i aclassName="fa fa-male" /> Plazas
							</label>
						</p>
						<input className="w3-input w3-border" type="number" value="1" name="Plazas" min="1" max="4" />
						<p>
							<label>
								<i className="fa fa-child" /> Centro
							</label>
						</p>
						<input className="w3-input w3-border" type="number" value="0" name="Kids" min="0" max="6" />
						<p>
							<button className="w3-button w3-block w3-green w3-left-align" type="submit">
								<i className="fa fa-search w3-margin-right" /> Search availability
							</button>
						</p>
					</form>

					<div className="w3-bar-block">
						<a href="#apartment" className="w3-bar-item w3-button w3-padding-16">
							<i className="fa fa-building" /> Apartment
						</a>
						<a
							href="javascript:void(0)"
							className="w3-bar-item w3-button w3-padding-16"
							onClick="document.getElementById('subscribe').style.display='block'">
							<i className="fa fa-rss" /> Subscribe
						</a>
						<a href="#contact" className="w3-bar-item w3-button w3-padding-16">
							<i className="fa fa-envelope" /> Contact
						</a>
					</div>
				</div>
			</nav>

			{/* <!-- multistep form --> */}
			{/* <form className="msform_3" method="post">
				{/* <!-- progressbar --> */}
			{/* <ul className="progressbar">
					<li className="active">Centros</li>
					<li>Reserva</li>
					<li>Pago</li>
				</ul>
			</form> */}
			{/* <h4 className=" fs-title d-flex justify-content-center ">Reservar Pista</h4> */}
			{/* <RegisterCenter /> */}

			<div>
				{/* <!-- Overlay effect when opening sidebar on small screens --> */}
				<div
					className="w3-overlay w3-hide-large w3-animate-opacity"
					onClick="w3_close()"
					style={{ cursor: "pointer" }}
					title="close side menu"
					id="myOverlay"
				/>

				{/* <!-- !PAGE CONTENT! --> */}
				<div className="w3-main">
					{/* <!-- Header --> */}
					<header className="w3-container">
						<h5>
							<b>
								<i className="fa fa-dashboard" /> Centros deportivos
							</b>
						</h5>
					</header>

					<CenterAvailable />
					<CenterAvailable />
					<CenterAvailable />
				</div>
			</div>
		</div>
	);
}
