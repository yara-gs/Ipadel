import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Button } from "bootstrap";
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
		if (user !== null) {
			fetch(process.env.BACKEND_URL + "/api/profile/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => setProfile(resultJson));
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

	//PROFILE
	//UPDATE PROFILE
	function updateProfile() {
		let body_profile = {
			user_id: user.id,
			birth: birth,
			city: city,
			country: country
			// gender: gender
		};

		setMessage("");
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
	}

	return (
		<body>
			<form action="/action_page.php" className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
				<h2 className="w3-center">Tu Perfil</h2>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-user" />
					</div>

					<div className="w3-rest">
						<input readOnly className="w3-input w3-border" name="first" type="text" value={user.username} />
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
							placeholder="Ciudad"
							onChange={event => {
								setCity(event.target.value);
							}}
						/>
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
							onChange={event => {
								setCountry(event.target.value);
							}}
						/>
					</div>
				</div>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-envelope-o" />
					</div>
					<div className="w3-rest">
						<input readOnly type="text" className="w3-input w3-border" name="email" value={user.email} />
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
							onChange={event => {
								setBirth(event.target.value);
							}}
						/>
					</div>
				</div>
			</form>
			<div className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
				<button
					className="w3-button w3-block w3-section w3-blue w3-ripple w3-padding w3-center"
					style={{ width: "400px" }}
					onClick={() => createProfile()}>
					Save Profile
				</button>
				<button
					className="w3-button w3-block w3-section w3-blue w3-ripple w3-padding w3-center "
					style={{ width: "400px" }}
					onClick={() => updateProfile()}>
					Update Profile
				</button>
			</div>
		</body>
	);
}
