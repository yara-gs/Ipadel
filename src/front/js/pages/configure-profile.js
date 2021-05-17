import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import MiRedPostText from "../component/MiRed/miRedPostText";

export default function ConfigureProfile() {
	const [todos, setTodos] = useState([]);
	const [newTodo, SetNewTodo] = useState("");

	const { actions, store } = useContext(Context);
	let user = actions.getUser();
	const [profile, setProfile] = useState("");
	const [birth, setBirth] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");

	const [gender, setGender] = useState("Mujer");
	const [image, setImage] = useState("");
	//variables Post
	const [posts, setPosts] = useState(null);
	const [postText, setPostText] = useState("Mi post");

	//variables Comments
	const [message, setMessage] = useState("");
	const [comments, setComments] = useState(null);
	const [commentText, setCommentText] = useState("Mi primer comentario");

	//variables likes
	const [likes, setLikes] = useState(null);

	//PROFILE
	//GET PROFILE
	useEffect(() => {
		if (user) {
			fetch(process.env.BACKEND_URL + "/api/profile/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setProfile(resultJson);
					setBirth(resultJson.birth);
					setCountry(resultJson.country);
					setCity(resultJson.city);
				});
		}
	}, []);

	//PROFILE
	//SAVE NEW PROFILE
	function createProfile() {
		let body_profile = {
			user_id: user.id,
			birth: birth,
			city: city,
			country: country
			// gender: gender
		};
		setMessage("");
		if (profile) {
			fetch(process.env.BACKEND_URL + "/api/profileupdate/" + profile.id, {
				method: "PUT",
				body: JSON.stringify(body_profile),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => response.json())
				.then(responseJson => {
					setProfile(body_profile);
					setMessage(" se ha modificado correctamente");
				});
		} else {
			fetch(process.env.BACKEND_URL + "/api/profile/", {
				method: "POST",
				body: JSON.stringify(body_profile),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => response.json())
				.then(responseJson => {
					setProfile(responseJson);
					setMessage(" profile guardado correctamente");
				});
		}
	}

	return (
		<body>
			<form className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
				<h2 className="w3-center">Tu Perfil</h2>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-user" />
					</div>

					<div className="w3-rest">
						{user ? (
							<input
								readOnly
								className="w3-input w3-border"
								name="first"
								type="text"
								value={user.username}
							/>
						) : (
							""
						)}
					</div>
				</div>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-user" />
					</div>
					<div className="w3-rest">
						<select
							className="w3-input w3-border"
							name="last"
							type="text"
							placeholder="Ciudad"
							value={city}
							required
							onChange={() => setCity(event.target.value)}>
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
						</select>
					</div>
				</div>
				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-user" />
					</div>
					<div className="w3-rest">
						<input
							className="w3-input w3-border"
							name="last"
							type="text"
							placeholder="Pais"
							value={country}
							onChange={event => {
								setCountry(event.target.value);
							}}
						/>
					</div>
				</div>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-bars" />
					</div>
					<div className="w3-rest">
						{user ? (
							<input
								readOnly
								type="text"
								className="w3-input w3-border"
								name="email"
								value={user.email}
							/>
						) : (
							""
						)}
					</div>
				</div>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-birthday-cake" />
					</div>
					<div className="w3-rest">
						<input
							className="w3-input w3-border"
							name="birth"
							type="text"
							placeholder="Birth Date"
							value={birth}
							onChange={event => {
								setBirth(event.target.value);
							}}
						/>
					</div>
				</div>

				<Link to="/mired">
					<button
						className="w3-button w3-block w3-section w3-round-xlarge w3-blue"
						style={{ width: "270px" }}
						onClick={() => createProfile()}>
						Save Changes
					</button>
				</Link>
			</form>
		</body>
	);
}
