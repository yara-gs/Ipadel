import React, { useState } from "react";
import "../../styles/sign.scss";

import SignUpSvg from "../component/signUp_svg.jsx";
import SignInSvg from "../component/signIn_svg.jsx";
import LogoiPadel from "../component/logoiPadel.jsx";
import TennisBall from "../../img/tennisball.png";

export default function Sign() {
    const [signUpMode, setSignUpMode] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    export default function Login() {
        const [signUpMode, setSignUpMode] = useState(false);
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");

        return (
            <div className={signUpMode ? "containertest sign-up-mode" : "containertest"}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="#" className="sign-in-form">
                            <h2 className="title">Iniciar sesión</h2>
                            <div className="input-field">
                                <i className="fas fa-user" />
                                <input type="text" placeholder="Username" onChange={event => {
                                    setUsername(event.target.value);
                                }} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock" />
                                <input type="password" placeholder="Password" onChange={event => {
                                    setPassword(event.target.value);
                                }} />
                            </div>
                            <input type="submit" value="Login" className="btn solid"
                                onClick={() => {
                                    fetch("https://3001-apricot-panther-h75j6m3a.ws-eu03.gitpod.io/api/login", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            username: username,
                                            password: password
                                        })
                                    });
                                }} />
                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-twitter" />
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google" />
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </div>
                        </form>
                        <form action="#" className="sign-up-form">
                            <h2 className="title">Crear cuenta</h2>
                            <div className="input-field">
                                <i className="fas fa-user" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    onChange={event => {
                                        setUsername(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    onChange={event => {
                                        setEmail(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={event => {
                                        setPassword(event.target.value);
                                    }}
                                />
                            </div>
                            <input
                                type="submit"
                                className="btn"
                                value="Sign up"
                                onClick={() => {
                                    fetch("https://3001-apricot-panther-h75j6m3a.ws-eu03.gitpod.io/api/sign", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            username: username,
                                            email: email,
                                            password: password
                                        })
                                    });
                                }}
                            />
                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-twitter" />
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google" />
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h2>Todavía no formas parte de la comunidad </h2>
                            <h1 className="iPadel">
                                <LogoiPadel />?
						</h1>
                            <p className="sign-text">Introduce tus datos para unirte!</p>
                            <button className="btn transparent" id="sign-up-btn" onClick={() => setSignUpMode(true)}>
                                Crear cuenta
						</button>
                            <p>
                                <SignInSvg />
                            </p>
                        </div>
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h2>Ya perteneces a la comunidad</h2>
                            <span className="iPadel">
                                <LogoiPadel />!
						</span>
                            <p className="sign-text">Introduce tus datos para acceder</p>
                            <button className="btn transparent" id="sign-in-btn" onClick={() => setSignUpMode(false)}>
                                Iniciar sesión
						</button>
                            <p>
                                <SignUpSvg />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}