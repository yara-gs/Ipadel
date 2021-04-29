import React, { useState } from "react";

export const Forgot = () => {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");

	function requestForgotPassword(event) {
		event.preventDefault();
		if (email.trim() == "") {
			setEmailError("Email obligatorio");
			return;
		}
		fetch(process.env.BACKEND_URL + "/api/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		});
	}

	return (
		<div className="jumbotron">
			<form>
				<label>
					Email
					<input
						type="email"
						required
						onChange={event => {
							setEmail(event.target.value);
						}}
					/>
					{emailError ? <span>{emailError}</span> : ""}
				</label>
				<input type="button" value="Recuperar" onClick={requestForgotPassword} />
			</form>
		</div>
	);
};
