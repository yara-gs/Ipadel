import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";
import { Alert } from "reactstrap";
import Geocode from "react-geocode";

import CenterAvailable from "../../component/courtReservation/centerAvailable.jsx";
import "../../../styles/court-reservation.scss";

import pushSignPage from "../../pushSignPage";
import setTimeout_useEffect from "../../setTimeout";
import Profile from "../profile";

export default function ChooseCenter() {
	const { actions, store } = useContext(Context);
	let user = null;
	const history = useHistory();

	const [message, setMessage] = useState("");
	const [locationFilter, setLocationFilter] = useState("");
	const [dateFilter, setDateFilter] = useState("");
	const [playersFilter, setPlayersFilter] = useState(1);
	const [centersbyCity, setCentersbyCity] = useState(null);
	const [Profile, setProfile] = useState(null);
	//geolocalization
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);

	let today = new Date();
	let today_string = today.toISOString().slice(0, 10);
	let inputdate = new Date(dateFilter);
	let dateCorrect = true;

	//funcion que lleva a sign si no hay usario logueado
	pushSignPage();

	// Get the Sidebar
	var mySidebar = document.getElementById("mySidebar");

	// Get the DIV with overlay effect
	var overlayBg = document.getElementById("myOverlay");

	useEffect(() => {
		if (dateCorrect) {
			setMessage("");
		} else {
			setMessage("La fecha no puede ser anterior a hoy");
		}
	}, [dateFilter]);

	if (inputdate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0) && dateFilter != null) {
		dateCorrect = false;
	} else {
		dateCorrect = true;
	}

	//GET ALL PREBOOKINGS
	function get_sportcenters(location) {
		if (event) {
			event.preventDefault();
		}

		setMessage("");

		if (dateCorrect) {
			//envio datos a la base de datos
			fetch(process.env.BACKEND_URL + "/api/sportcenters/" + location, {
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
		} else {
			setMessage("La fecha no puede ser anterior a hoy");
		}
	}

	//call funcion setTimeout
	setTimeout_useEffect(message, setMessage, 2000);

	//GEOLOCALIZACION

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;
		setLatitude(crd.latitude.toString());
		setLongitude(crd.longitude.toString());
	}

	useEffect(() => {
		Geocode.fromLatLng(latitude, longitude).then(
			response => {
				let city;
				for (let i = 0; i < response.results[0].address_components.length; i++) {
					for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
						switch (response.results[0].address_components[i].types[j]) {
							case "locality":
								city = response.results[0].address_components[i].long_name;
								setDateFilter(today_string);
								setLocationFilter(city.toLowerCase());
								get_sportcenters(city.toLowerCase());
						}
					}
				}
			},
			error => {
				// setMessage(error);
				setDateFilter(today_string);
			}
		);
	}, [latitude, longitude]);

	function error(err) {
		console.warn("ERROR(" + err.code + "): " + err.message);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);

	// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
	Geocode.setApiKey("AIzaSyCK0cv0J3jEzXPKeHQx_QOg9HDYxOm5-i0");

	// set response language. Defaults to english.
	Geocode.setLanguage("es");

	//set response region. Its optional.
	// A Geocoding request with region=es (Spain) will return the Spanish city.
	Geocode.setRegion("es");

	// set location_type filter . Its optional.
	// google geocoder returns more that one address for given lat/lng.
	// In some case we need one address as response for which google itself provides a location_type filter.
	// So we can easily parse the result for fetching address components
	// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
	// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
	Geocode.setLocationType("ROOFTOP");

	// Enable or disable logs. Its optional.
	Geocode.enableDebug();

	return (
		<div className="body">
			{/* <!-- Sidebar/menu --> */}
			<nav
				className="w3-sidebar w3-light-grey w3-collapse w3-white w3-animate-left chooseCenter-nav"
				id="mySidebar">
				<div className="w3-container w3-display-container w3-padding-16">
					<i onClick="w3_close()" className="fa fa-remove w3-hide-large w3-button w3-transparent " />
					<h5 className="mt-4">
						<div className="text_xlarge">Reservar Pista</div>
					</h5>

					<hr />

					<form className="chooseCenter-form" onSubmit={() => get_sportcenters(locationFilter)}>
						<label id="city">
							<i className="fas fa-map-marker-alt" /> Localidad
						</label>

						<select
							name="city"
							id="city"
							className="w3-input w3-border"
							type="text"
							placeholder="Localidad"
							value={locationFilter}
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

						<label className="pt-3">
							<i className="far fa-calendar-alt" /> Fecha
						</label>

						<input
							className="w3-input w3-border"
							type="date"
							placeholder="DD MM YYYY"
							name="CheckOut"
							value={dateFilter}
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
						<p />
						<button className="btn  w3-green w3-center-align mt-3" type="submit">
							<i className="fa fa-search w3-margin-right " /> Buscar
						</button>
					</form>
					<div> {message == "" ? "" : <Alert color="warning">{message}</Alert>}</div>
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
					<h5 className="mt-4">
						<div className="pt-2 pb-2 text_xlarge">Centros Deportivos </div>
					</h5>
					<br />

					{centersbyCity != null && dateCorrect ? (
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
