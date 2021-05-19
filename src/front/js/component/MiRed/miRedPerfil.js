import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedPerfil() {
	const { actions, store } = useContext(Context);
	const [profile, setProfile] = useState(null);
	const [city, setCity] = useState("");
	const [inputuserImage, setInputUserImage] = useState(null);
	const [userImage, setUserImage] = useState("https://www.w3schools.com/w3images/avatar2.png");
	const [message, setMessage] = useState("");
	let user = actions.getUser();

	useEffect(() => {
		if (user) {
			setUserImage(user.url_image);
			fetch(process.env.BACKEND_URL + "/api/profile/" + user.id, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
					// 'Content-Type': 'application/x-www-form-urlencoded',
				}
			})
				.then(response => {
					return response.json();
				})
				.then(responseJson => {
					setProfile(responseJson);
				});
		}
	}, []);

	function upload_userImage() {
		const formData = new FormData();
		formData.append("image", inputuserImage[0]);
		setMessage("");
		if (user) {
			fetch(process.env.BACKEND_URL + "/api/user_image/" + user.id, {
				method: "PUT",
				body: formData
			})
				.then(response => response.json())
				.then(responseJson => {
					setUserImage(responseJson);
					user_with_image = user;
					user_with_image.url_image = responseJson;
					setMessage("Imagenes importadas correctamente");
					// setImporting(false);
				})

				.catch(error => {
					// setError(error.message);
					// setImporting(false);
					setMessage("Fallo al importar imagenes");
				});
		}
	}

	useEffect(() => {
		if (user) {
			let user_with_image = user;
			user_with_image.url_image = userImage;
			actions.saveUser(user_with_image);
		}
	}, [userImage]);
	// if (user) {
	// 	if (user.url_image !== "" && userImage !== user.url_image) {
	// 		let user_with_image = user;
	// 		user_with_image.url_image = userImage;
	// 		actions.saveUser(user_with_image);
	// 		setUserImage(user.url_image);
	// 	}
	// }

	return (
		<div className="w3-col">
			<div className="w3-card w3-round w3-white">
				<div className="w3-container">
					{user ? <h4 className="w3-center">{user.username}</h4> : ""}

					<p className="w3-center">
						<div className="user-image d-flex justify-content-center">
							<div
								className="user-image"
								style={{
									backgroundImage: `url(${userImage})`,
									width: "106px",
									height: "106px"
								}}
							/>
						</div>
					</p>
					<input type="file" onChange={event => setInputUserImage(event.currentTarget.files)} />
					<p />
					<button onClick={() => upload_userImage()} className=" w3-btn w3-green">
						Save
					</button>

					{profile ? (
						<p>
							<i className="fa fa-home fa-fw w3-margin-right w3-text-theme" /> {profile.city},{" "}
							{profile.country}
						</p>
					) : (
						""
					)}
					{profile ? (
						<p>
							<i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme" /> {profile.birth}
						</p>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
