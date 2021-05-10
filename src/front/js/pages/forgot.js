import React, { useState } from "react";
//import { Link, useHistory } from "react-router-dom";

export const Forgot = () => {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	//const history = useHistory();

	function requestForgotPassword(event) {
		event.preventDefault();
		if (email.trim() == "") {
			setEmailError("Email obligatorio");
			return;
		}

		let responseOk = false;

		fetch(process.env.BACKEND_URL + "/api/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		}).then(response => {
			responseOk = response.ok;
			if (response.ok) {
				//history.push("/new_password");
			}
			return response.json();
		});
	}

	return (
		<div className="jumbotron">
			<form>
				<label>
					<div>Email</div>
					<input
						type="email"
						required
						onChange={event => {
							setEmail(event.target.value);
						}}
					/>
					<div>
						<div>{emailError ? <span>{emailError}</span> : ""}</div>
					</div>
				</label>
				<input type="button" value="Recuperar" onClick={requestForgotPassword} />
			</form>
		</div>
	);
};
