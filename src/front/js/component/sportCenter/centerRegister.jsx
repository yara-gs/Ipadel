import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import { useHistory } from "react-router-dom";

import { Col, Form, Button } from "react-bootstrap";
import "../../../styles/center.scss";

export default function RegisterCenter() {
	const { actions, store } = useContext(Context);

	const [center_name, setCenter_Name] = useState("");
	const [nif, setNif] = useState("");
	const [admin_user, setAdmin_User] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState(0);
	const [webpage, setWebpage] = useState("");
	const [address, setAddress] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [cp, setCp] = useState("");
	const [image, setImage] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	let history = useHistory();

	//POST NEW SPORT CENTER
	function createCenter(event) {
		event.preventDefault();
		let body = {
			user_id: store.user.id,
			nif: nif,
			center_name: center_name,
			phone: phone,
			webpage: webpage,
			address: address,
			state: state,
			city: city,
			cp: cp
		};

		let responseOk = false;
		setMessage("");
		setError("");

		//Comprobar Password & ConfirmPassword son iguales

		//envio datos a la base de datos
		fetch(process.env.BACKEND_URL + "/api/newcenter", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				responseOk = response.ok;
				if (response.ok) {
					setMessage("Centro registrado con exito");
					history.push("/configure-courts");
				}
				return response.json();
			})
			.then(responseJson => {
				if (!responseOk) {
					setError(responseJson.message);
				}
			})
			.catch(error => {
				setError(error.message);
			});
	}

	return (
		<div className="container col-12 col-xl-8 col-md-9 d-flex d-flex justify-content-center ">
			<Form className="registerForm d-flex justify-content-start" onSubmit={event => createCenter(event)}>
				<Form.Row className="adminUser">
					<Form.Group as={Col} controlId="formAdminUser">
						<Form.Label>Usuario administrador</Form.Label>
						<Form.Control
							className="form_inputfield"
							required
							placeholder=""
							onChange={() => setAdmin_User(event.target.value)}
							// autoComplete="off"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridPassword">
						<Form.Label>Contraseña</Form.Label>
						<Form.Control
							required
							className="form_inputfield"
							type="password"
							placeholder=""
							onChange={() => setPassword(event.target.value)}
							// autoComplete="off"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridConfirmPassword">
						<Form.Label>Confirmar contraseña</Form.Label>
						<Form.Control
							required
							className="form_inputfield"
							type="password"
							placeholder=""
							onChange={() => setConfirmPassword(event.target.value)}
							// autoComplete="off"
						/>
					</Form.Group>
				</Form.Row>

				<Form.Row className="password">
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
						<Form.Label>NIF</Form.Label>
						<Form.Control
							required
							className="form_inputfield"
							placeholder=""
							onChange={() => setNif(event.target.value)}
							// autoComplete="off"
						/>
					</Form.Group>
				</Form.Row>

				<Form.Group as={Col} controlId="formGridEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						required
						className="form_inputfield"
						type="email"
						placeholder=""
						onChange={() => setEmail(event.target.value)}
					/>
				</Form.Group>
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
				<Form.Group
					as={Col}
					controlId="formGridWeb"
					onChange={() => setWebpage(event.target.value)}
					autoComplete="off">
					<Form.Label>Web</Form.Label>
					<Form.Control required className="form_inputfield" />
				</Form.Group>

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

				<div className=" d-flex justify-content-center">
					<Button className="btn solid" variant="primary" type="submit">
						Dar de Alta
					</Button>
				</div>
				<p className="message">{message} </p>
				<p className="errorMessage">{error} </p>
			</Form>
		</div>
	);
}
