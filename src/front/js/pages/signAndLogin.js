import React, { useState, useContext } from "react";
import "../../styles/sign.scss";
import { Link, useHistory } from "react-router-dom";
import SignUpSvg from "../component/signUp_svg.jsx";
import PropTypes from "prop-types";
import SignInSvg from "../component/signIn_svg.jsx";
import LogoiPadel from "../component/logoiPadel.jsx";
import TennisBall from "../../img/tennisball.png";
import { Context } from "../store/appContext";

export default function SignAndLogin(props) {
	const [signUpMode, setSignUpMode] = useState(props.sign);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const { actions } = useContext(Context);
	const history = useHistory();

	if (props.sign !== signUpMode) {
		setSignUpMode(props.sign);
	}

	//CREATE USER
	function createUser(event) {
		event.preventDefault();
		setError("");
		setMessage("");
		if (email == "") {
			setError("Email obligatorio");
			return;
		}
		if (password != confirmPassword) {
			setError("");
			setError("Contraseña no coincide");

			return;
		}
		let body = {
			username: username,
			email: email,
			password: password
		};
		let responseOk = false;

		fetch(process.env.BACKEND_URL + "/api/sign", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				responseOk = response.ok;
				if (response.ok) {
					setMessage("Usuario registrado con éxito");
				}
				return response.json();
			})
			.then(responseJson => {
				if (!responseOk) {
					setError(responseJson.message);
				}
				history.push("/login");
			})
			.catch(error => {
				setError(error.message);
			});
		return false;
	}
	//USER LOGIN
	function logUser(event) {
		event.preventDefault();
		setError("");
		let body = {
			username: username,
			password: password
		};
		let responseOk = false;
		fetch(process.env.BACKEND_URL + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				responseOk = response.ok;
				return response.json();
			})
			.then(responseJson => {
				if (responseOk) {
					setMessage("Bienvenido");
					actions.saveAccessToken(responseJson.access_token);
				} else {
					setError(responseJson.message);
				}
				history.push("/mired");
			})
			.catch(error => {
				console.log(error);
				setError(error.message);
			});
	}
	return (
		<div className={signUpMode ? "containertest sign-up-mode" : "containertest"}>
			<div className="forms-container">
				<div className="signin-signup">
					<form action="#" className="sign-in-form">
						<h2 className="title">Iniciar sesión</h2>
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
							<i className="fas fa-lock" />
							<input
								type="password"
								placeholder="Password"
								onChange={event => {
									setPassword(event.target.value);
								}}
							/>
						</div>
						<input type="submit" value="Login" className="btn solid" onClick={logUser} />
						<p className="social-text">Or Sign in with social platforms</p>
						<div className="social-media">
							<a href="#" className="social-icon">
								<i className="fab fa-facebook-f" onClick={fbLogin} />
							</a>
							<a href="#" className="social-icon">
								<i className="fab fa-google" />
							</a>
						</div>
					</form>
					<form action="#" className="sign-up-form" onSubmit={createUser}>
						<div>{error ? <h1>{error}</h1> : ""}</div>
						<div>{message ? <h1>{message}</h1> : ""}</div>
						<h2 className="title">Crear cuenta</h2>
						<div className="input-field">
							<i className="fas fa-user" />
							<input
								type="text"
								placeholder="Username"
								required
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
								required
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
								required
								onChange={event => {
									setPassword(event.target.value);
								}}
							/>
						</div>

						<div className="input-field">
							<i className="fas fa-lock" />
							<input
								type="password"
								placeholder="Confirm Password"
								required
								onChange={event => {
									setConfirmPassword(event.target.value);
								}}
							/>
						</div>
						<input type="submit" className="btn" value="Sign up" />
						<p className="social-text">Or Sign up with social platforms</p>
						<div className="social-media">
							<a href="#" className="social-icon">
								<i className="fab fa-facebook-f" />
							</a>
							<a href="#" className="social-icon">
								<i className="fab fa-google" />
							</a>
						</div>
					</form>
				</div>
			</div>

			<div className="panels-container">
				<div className="panel left-panel">
					<div className="content">
						<h2>Todavía no formas parte de la comunidad </h2>
						<span className="iPadel ">
							<LogoiPadel />?
						</span>
						<p className="sign-text">Introduce tus datos para unirte!</p>
						<Link to="/sign">
							<button className="btn transparent" id="sign-up-btn">
								Crear cuenta
							</button>
						</Link>
						<p>
							<SignInSvg />
						</p>
					</div>
				</div>
				<div className="panel right-panel">
					<div className="content">
						<h2>Ya perteneces a la comunidad</h2>
						<span className="iPadel">
							<LogoiPadel />?
						</span>
						<p className="sign-text">Introduce tus datos para acceder</p>
						<Link to="/login">
							<button className="btn transparent" id="sign-in-btn">
								Iniciar sesión
							</button>
						</Link>
						<p>
							<SignUpSvg />
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

SignAndLogin.propTypes = {
	sign: PropTypes.bool
};
