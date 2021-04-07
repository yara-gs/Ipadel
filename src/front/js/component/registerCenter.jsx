import React, { useState, useEffect } from "react";
import { Col, Form, Button } from "react-bootstrap";
import "../../styles/registercenter.scss";

export default function RegisterCenter() {
	const [admin_user, setAdmin_User] = useState("");
	const [center_name, setCenter_Name] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [webpage, setWebpage] = useState("");
	const [image, setImage] = useState("");
	let body = {
		admin_user: "",
		center_name: "",
		address: "",
		password: "",
		email: "",
		phone: "",
		webpage: "",
		image: ""
	};

	//POST NEW SPORT CENTER
	function createCenter() {
		body.admin_user = admin_user;
		body.center_name = center_name;
		body.address = address;
		body.password = password;
		body.email = email;
		body.phone = phone;
		body.webpage = webpage;
		body.image = image;

		console.log(body);

		fetch(process.env.BACKEND_URL + "/api/newcenter", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
	}

	return (
		<div className="container col-12 col-xl-8 col-md-9 d-flex d-flex justify-content-center ">
			<div className="formbody ">
				<h2> Dar de alta un centro deportivo </h2>
				<Form className="form d-flex justify-content-start">
					<Form.Group as={Col} controlId="formCenterName">
						<Form.Label>Nombre Centro Deportivo</Form.Label>
						<Form.Control placeholder="Padel Center" onChange={() => setCenter_Name(event.target.value)} />
					</Form.Group>

					<Form.Group as={Col} controlId="formAdminUser">
						<Form.Label>Usuario administrador</Form.Label>
						<Form.Control
							placeholder="sportcenteradmin"
							onChange={() => setAdmin_User(event.target.value)}
						/>
					</Form.Group>

					<Form.Row className="password">
						<Form.Group as={Col} controlId="formGridPassword">
							<Form.Label>Contraseña</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={() => setPassword(event.target.value)}
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridConfirmPassword">
							<Form.Label>Confirmar contraseña</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm Password"
								onChange={() => setConfirmPassword(event.target.value)}
							/>
						</Form.Group>
					</Form.Row>

					<Form.Group as={Col} controlId="formGridEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Introduce email"
							onChange={() => setEmail(event.target.value)}
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridPhone">
						<Form.Label>Teléfono</Form.Label>
						<Form.Control
							type="phone"
							placeholder="xxxxxxxxx"
							onChange={() => setPhone(event.target.value)}
						/>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridAddress">
						<Form.Label>Dirección</Form.Label>
						<Form.Control placeholder="1234 Main St" onChange={() => setAddress(event.target.value)} />
					</Form.Group>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridCity">
							<Form.Label>Ciudad</Form.Label>
							<Form.Control />
						</Form.Group>

						<Form.Group as={Col} controlId="formGridState">
							<Form.Label>Provincia</Form.Label>
							<Form.Control as="select" defaultValue="Choose...">
								<option>...</option>
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridCP">
							<Form.Label>CP</Form.Label>
							<Form.Control />
						</Form.Group>
					</Form.Row>
					<Form.Group as={Col} controlId="formGridWeb" onChange={() => setWebpage(event.target.value)}>
						<Form.Label>Web</Form.Label>
						<Form.Control />
					</Form.Group>

					<Form.Label as={Col}>Metodos de pago</Form.Label>
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
					</Form.Row>
				</Form>
				<Button variant="primary" type="submit" onClick={() => createCenter()}>
					Submit
				</Button>
			</div>
		</div>
	);
}
