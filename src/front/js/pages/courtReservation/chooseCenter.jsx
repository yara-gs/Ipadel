import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";

import CenterAvailable from "../../component/courtReservation/centerAvailable.jsx";
import "../../../styles/court-reservation.scss";

import pushSignPage from "../../pushSignPage";

export default function ChooseCenter() {
	const { actions, store } = useContext(Context);
	const history = useHistory();

	const [locationFilter, setLocationFilter] = useState("");
	const [dateFilter, setDateFilter] = useState(null);
	const [playersFilter, setPlayersFilter] = useState(1);

	//funcion que lleva a sign si no hay usario logueado
	// pushSignPage();

	// Get the Sidebar
	var mySidebar = document.getElementById("mySidebar");

	// Get the DIV with overlay effect
	var overlayBg = document.getElementById("myOverlay");

	//POST NEW SPORT CENTER
	function booking() {
		let body = {
			booking_date_time_start: setDateFilter + " 10:00",
			booking_date_time_end: setDateFilter + " 11:00",
			players: playersFilter,
			court_id: 3
		};

		// setMessage("");
		// setError("");

		//envio datos a la base de datos
		fetch(process.env.BACKEND_URL + "/api/booking/" + body.court_id, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then(responseJson => {
				// actions.saveSportCenter(responseJson);
				// history.push("/configure-courts");
				console.log(body);
			})
			.catch(error => {
				// setError(error.message);
			});
	}

	return (
		<div>
			{/* <!-- Sidebar/menu --> */}
			<nav
				className="w3-sidebar w3-light-grey w3-collapse w3-white w3-animate-left chooseCenter-nav"
				id="mySidebar">
				<div className="w3-container w3-display-container w3-padding-16">
					<i onClick="w3_close()" className="fa fa-remove w3-hide-large w3-button w3-transparent t" />
					<h3>Reservar Pista</h3>

					<hr />

					<form className="chooseCenter-form">
						<label>
							<i className="fas fa-map-marker-alt" /> Localidad
						</label>

						<input
							className="w3-input w3-border"
							type="text"
							placeholder="Localidad"
							name="Localidad"
							required
						/>

						<label className="pt-3">
							<i className="far fa-calendar-alt" /> Fecha
						</label>

						<input
							className="w3-input w3-border"
							type="date"
							placeholder="DD MM YYYY"
							name="CheckOut"
							required
							onChange={() => setDateFilter(event.target.value)}
						/>

						<label className="pt-3">
							<i className="fa fa-male" /> Plazas
						</label>
						<input
							className="w3-input w3-border"
							type="number"
							value="1"
							name="Plazas"
							min="1"
							max="4"
							onChange={() => setPlayers(event.target.value)}
						/>

						<label className="pt-3 ">
							<i className="fas fa-baseball-ball" /> Centro
						</label>
						<input className="w3-input w3-border" type="number" value="0" name="Kids" min="0" max="6" />
						<p>
							<button className="w3-button w3-block w3-green w3-left-align mt-4" type="submit">
								<i className="fa fa-search w3-margin-right" /> Buscar
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
				<div className="w3-main ">
					{/* <!-- Header --> */}

					<h3 className="pt-2 pb-2 ">Centros Deportivos </h3>
					<button onClick={() => booking()}>Reservar</button>

					<CenterAvailable />
					<CenterAvailable />
					<CenterAvailable />
				</div>
			</div>
		</div>
	);
}
