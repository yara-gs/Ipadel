import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import { useHistory } from "react-router-dom";

import { Col, Form, Button } from "react-bootstrap";
import "../../../styles/center.scss";

export default function CenterRegister() {
	const { actions, store } = useContext(Context);

	// const [user, setUser] = useState(actions.getUser());
	const [center_name, setCenter_Name] = useState("");
	const [nif, setNif] = useState("");
	const [phone, setPhone] = useState(0);
	const [webpage, setWebpage] = useState("");
	const [address, setAddress] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [cp, setCp] = useState("");
	const [openningTime, setOpenningTime] = useState(9);
	const [closingTime, setClosingTime] = useState(22);

	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	let user = actions.getUser();
	let history = useHistory();

	//POST NEW SPORT CENTER
	function createCenter(event) {
		event.preventDefault();
		let body = {
			user_id: user.id,
			nif: nif,
			center_name: center_name,
			phone: phone,
			webpage: webpage,
			address: address,
			state: state,
			city: city,
			cp: cp,
			opening_time: openningTime,
			closing_time: closingTime,
			capacity: 10
		};

		setMessage("");
		setError("");

		//envio datos a la base de datos
		fetch(process.env.BACKEND_URL + "/api/newcenter", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then(responseJson => {
				actions.saveSportCenter(responseJson);
				history.push("/configure-courts");
			})
			.catch(error => {
				setError(error.message);
			});
	}

	return (
		<div
			className="container col-12 col-xl-8 col-md-9 d-flex d-flex justify-content-center "
			style={{ border: "none" }}>
			<Form
				className="registerForm  w3-container w3-card-4 w3-light-grey  w3-margin"
				onSubmit={event => createCenter(event)}>
				<div style={{ width: "600px", paddingLeft: "25px", paddingRight: "25px" }}>
					<br />
					<Form.Row>
						<Form.Group as={Col} controlId="formCenterName">
							<Form.Label>Nombre Centro Deportivo</Form.Label>
							<Form.Control
								required
								className="form_inputfield"
								placeholder=""
								onChange={() => setCenter_Name(event.target.value)}
								// autoComplete="off"
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="formNIF">
							<Form.Label>CIF</Form.Label>
							<Form.Control
								required
								className="form_inputfield"
								placeholder=""
								onChange={() => setNif(event.target.value)}
								// autoComplete="off"
							/>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridPhone">
							<Form.Label>Teléfono</Form.Label>
							<Form.Control
								required
								className="form_inputfield"
								type="phone"
								placeholder=""
								onChange={() => setPhone(event.target.value)}
								// autoComplete="off"
							/>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group
							as={Col}
							controlId="formGridWeb"
							onChange={() => setWebpage(event.target.value)}
							autoComplete="off">
							<Form.Label>Web</Form.Label>
							<Form.Control required className="form_inputfield" />
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridAddress">
							<Form.Label>Dirección</Form.Label>
							<Form.Control
								required
								className="form_inputfield"
								placeholder=""
								onChange={() => setAddress(event.target.value)}
								autoComplete="off"
							/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="formGridState">
							<Form.Label>Provincia</Form.Label>
							<Form.Control
								required
								className="form_inputfield"
								as="select"
								onChange={() => setState(event.target.value)}
								autoComplete="off">
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
							</Form.Control>
						</Form.Group>
						<Form.Group
							required
							as={Col}
							controlId="formGridCity"
							onChange={() => setCity(event.target.value)}
							autoComplete="off">
							<Form.Label>Municipio</Form.Label>
							<Form.Control className="form_inputfield" />
						</Form.Group>

						<Form.Group
							required
							as={Col}
							controlId="formGridCP"
							onChange={() => setCp(event.target.value)}
							autoComplete="off">
							<Form.Label>CP</Form.Label>
							<Form.Control className="form_inputfield" autoComplete="off" />
						</Form.Group>
					</Form.Row>

					{/* <Form.Label as={Col}>Metodos de pago</Form.Label>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridCheckbox">
							<Form.Check type="checkbox" label="Paypal" />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridCheckbox">
							<Form.Check type="checkbox" label="Monedero" />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridCheckbox">
							<Form.Check type="checkbox" label="Tarjeta" />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridCheckbox">
							<Form.Check type="checkbox" label="Pago en centro" />
						</Form.Group>
					</Form.Row> */}
					<Form.Row>
						<Form.Group as={Col} controlId="formGridState">
							<Form.Label>Apertura</Form.Label>
							<Form.Control
								required
								className="form_inputfield"
								as="select"
								onChange={() => setOpenningTime(event.target.value)}
								autoComplete="off">
								<option value="6">6:00</option>
								<option value="7">7:00</option>
								<option value="8">8:00</option>
								<option value="9">9:00</option>
								<option value="10">10:00</option>
								<option value="11">11:00</option>
								<option value="12">12:00</option>
								<option value="13">13:00</option>
								<option value="14">14:00</option>
								<option value="15">15:00</option>
								<option value="16">16:00</option>
								<option value="17">17:00</option>
								<option value="18">18:00</option>
								<option value="19">19:00</option>
								<option value="20">20:00</option>
								<option value="21">21:00</option>
								<option value="22">22:00</option>
								<option value="23">23:00</option>
								<option value="24">24:00</option>
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col} controlId="formNIF">
							<Form.Label>Cierre</Form.Label>
							<Form.Control
								required
								className="form_inputfield"
								as="select"
								onChange={() => setClosingTime(event.target.value)}
								autoComplete="off">
								<option value="6">6:00</option>
								<option value="7">7:00</option>
								<option value="8">8:00</option>
								<option value="9">9:00</option>
								<option value="10">10:00</option>
								<option value="11">11:00</option>
								<option value="12">12:00</option>
								<option value="13">13:00</option>
								<option value="14">14:00</option>
								<option value="15">15:00</option>
								<option value="16">16:00</option>
								<option value="17">17:00</option>
								<option value="18">18:00</option>
								<option value="19">19:00</option>
								<option value="20">20:00</option>
								<option value="21">21:00</option>
								<option value="22">22:00</option>
								<option value="23">23:00</option>
								<option value="24">24:00</option>
							</Form.Control>
						</Form.Group>
					</Form.Row>

					<div className=" d-flex justify-content-center">
						<Button className="btn solid" variant="primary" type="submit">
							Dar de Alta
						</Button>
					</div>
					<p className="message">{message} </p>
					<p className="errorMessage">{error} </p>
				</div>
			</Form>
		</div>
	);
}
