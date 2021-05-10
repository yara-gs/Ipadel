import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export const NewPassword = () => {
	const [password, setPassword] = useState("");
	const history = useHistory();

	function requestNewPassword(event) {
		event.preventDefault();
		if (password.trim() == "") {
			return;
		}

		let responseOk = false;

		fetch(process.env.BACKEND_URL + "/api'/reset-password'", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				password: password
			})
		}).then(response => {
			responseOk = response.ok;
			if (response.ok) {
				history.push("/login");
			}
			return response.json();
		});
	}

	return (
		<div className="jumbotron">
			<form>
				<label>
					<div>Nueva Contraseña</div>
					<input
						type="password"
						required
						onChange={event => {
							setPassword(event.target.value);
						}}
					/>
				</label>
				<input type="button" value="Recuperar" onClick={requestNewPassword} />
			</form>
		</div>
	);
};
