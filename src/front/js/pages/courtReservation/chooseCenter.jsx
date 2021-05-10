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
	const [centersbyCity, setCentersbyCity] = useState(null);

	//funcion que lleva a sign si no hay usario logueado
	pushSignPage();

	// Get the Sidebar
	var mySidebar = document.getElementById("mySidebar");

	// Get the DIV with overlay effect
	var overlayBg = document.getElementById("myOverlay");

	//GET ALL PREBOOKINGS
	function get_sportcenters() {
		event.preventDefault();
		// setMessage("");
		// setError("");

		//envio datos a la base de datos
		fetch(process.env.BACKEND_URL + "/api/sportcenters/" + locationFilter, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				setCentersbyCity(responseJson);
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

					<form className="chooseCenter-form" onSubmit={() => get_sportcenters()}>
						<label id="city">
							<i className="fas fa-map-marker-alt" /> Localidad
						</label>

						<select
							name="city"
							id="city"
							className="w3-input w3-border"
							type="text"
							placeholder="Localidad"
							required
							onChange={() => setLocationFilter(event.target.value)}>
							<option value="">...</option>
							<option value="alava">Álava</option>
							<option value="albacete">Albacete</option>
							<option value="alicante">Alicante/Alacant</option>
							<option value="almeria">Almería</option>
							<option value="asturias">Asturias</option>
							<option value="avila">Ávila</option>
							<option value="badajoz">Badajoz</option>
							<option value="barcelona">Barcelona</option>
							<option value="burgos">Burgos</option>
							<option value="caceres">Cáceres</option>
							<option value="cadiz">Cádiz</option>
							<option value="cantabria">Cantabria</option>
							<option value="castellon">Castellón/Castelló</option>
							<option value="ceuta">Ceuta</option>
							<option value="ciudadreal">Ciudad Real</option>
							<option value="cordoba">Córdoba</option>
							<option value="cuenca">Cuenca</option>
							<option value="girona">Girona</option>
							<option value="laspalmas">Las Palmas</option>
							<option value="granada">Granada</option>
							<option value="guadalajara">Guadalajara</option>
							<option value="guipuzcoa">Guipúzcoa</option>
							<option value="huelva">Huelva</option>
							<option value="huesca">Huesca</option>
							<option value="illesbalears">Illes Balears</option>
							<option value="jaen">Jaén</option>
							<option value="acoruña">A Coruña</option>
							<option value="larioja">La Rioja</option>
							<option value="leon">León</option>
							<option value="lleida">Lleida</option>
							<option value="lugo">Lugo</option>
							<option value="madrid">Madrid</option>
							<option value="malaga">Málaga</option>
							<option value="melilla">Melilla</option>
							<option value="murcia">Murcia</option>
							<option value="navarra">Navarra</option>
							<option value="ourense">Ourense</option>
							<option value="palencia">Palencia</option>
							<option value="pontevedra">Pontevedra</option>
							<option value="salamanca">Salamanca</option>
							<option value="segovia">Segovia</option>
							<option value="sevilla">Sevilla</option>
							<option value="soria">Soria</option>
							<option value="tarragona">Tarragona</option>
							<option value="santacruztenerife">Santa Cruz de Tenerife</option>
							<option value="teruel">Teruel</option>
							<option value="toledo">Toledo</option>
							<option value="valencia">Valencia/Valéncia</option>
							<option value="valladolid">Valladolid</option>
							<option value="vizcaya">Vizcaya</option>
							<option value="zamora">Zamora</option>
							<option value="zaragoza">Zaragoza</option>
						</select>

						{/* <input
							className="w3-input w3-border"
							type="text"
							placeholder="Localidad"
							name="Localidad"
							required
							onChange={() => setLocationFilter(event.target.value)}
						/> */}

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
							placeholder="1"
							name="Plazas"
							min="1"
							max="4"
							onChange={() => setPlayersFilter(event.target.value)}
						/>

						{/* <label className="pt-3 ">
							<i className="fas fa-baseball-ball" /> Centro
						</label>
						<input className="w3-input w3-border" type="text" value="" name="centro" /> */}
						<p>
							{/* <button
								className="w3-button w3-block w3-green w3-left-align mt-4"
								type="submit"
								onClick={() => getprebookings()}>
								<i className="fa fa-search w3-margin-right" /> Buscar
							</button> */}
						</p>
						<button className="w3-button w3-block w3-green w3-left-align mt-4" type="submit">
							<i className="fa fa-search w3-margin-right" /> Buscar
						</button>
					</form>
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

					{centersbyCity != null ? (
						<ul>
							{centersbyCity.map(center => {
								return (
									<CenterAvailable
										key={center.id}
										center={center}
										date={dateFilter}
										players={playersFilter}
									/>
								);
							})}
						</ul>
					) : (
						" "
					)}
				</div>
			</div>
		</div>
	);
}
