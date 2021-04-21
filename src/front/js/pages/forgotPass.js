import React, { useState } from "react";
import { func } from "prop-types";

export const forgotPass = () => {
    const [email, setEmail] = useState("");

    function requestForgotPassword() {
        fetch(process.env.BACKEND_URL + "/api/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
                email: email
            })
		})
    }

	return (
		<div className="jumbotron">
			<form>
                <label>
                    Email
                    <input type="email" onChange={(event) => {setEmail(event.target.value)}} />
                </label>
                <input type="button" value="Recuperar" onClick={requestForgotPassword} />
            </form>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
