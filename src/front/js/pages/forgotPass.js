import React, { useState } from "react";
import { func } from "prop-types";

export const forgotPass = () => {
    const [email, setEmail] = useState("");
    const [setEmailError, setEmailError] = useState("");

    function requestForgotPassword(event) {

        if (email.trim() == '') {
            setEmailError("Email obligatorio")
            return
        }
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
                    <input type="email" required onChange={(event) => { setEmail(event.target.value) }} />
                    {emailError ? <span>{emailError}</span> : ""}
                </label>
                <input type="button" value="Recuperar" onSubmit={requestForgotPassword} />
            </form>
        </div>
    );
};

Single.propTypes = {
    match: PropTypes.object
};
