import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedPerfil() {
	const { actions, store } = useContext(Context);
	const [profile, setProfile] = useState(null);
	const [city, setCity] = useState("");
	const [inputuserImage, setInputUserImage] = useState(null);
	const [userImage, setUserImage] = useState(null);
	const [message, setMessage] = useState("");
	let user = actions.getUser();

	useEffect(() => {
		if (user !== null) {
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
		let responseOk = false;
		console.log(formData);

		setMessage("");
		if (user) {
			fetch(process.env.BACKEND_URL + "/api/user_image/" + user.id, {
				method: "PUT",
				body: formData
			})
				.then(response => {
					return response.json();
				})
				.then(responseJson => {
					setUserImage(responseJson);
					user_with_image = user;
					user_with_image.url_image = responseJson;
					console.log(user_with_image);
					actions.saveUser(user_with_image);

					responseOk = response.ok;
					if (response.ok) {
						setMessage("Imagenes importadas correctamente");
					} else {
						setMessage("Fallo al importar imagenes");
					}
				})
				.catch(error => {
					setMessage("Fallo al importar imagenes");
				});
		}
	}

	return (
		<div className="w3-col">
			<div className="w3-card w3-round w3-white">
				<div className="w3-container">
					{user ? <h4 className="w3-center">{user.username}</h4> : ""}

					<p className="w3-center">
						{userImage ? (
							<div className="user-image d-flex justify-content-center">
								<div
									className="user-image"
									style={{
										backgroundImage: `url("http://ipadel.s3.amazonaws.com/IMG-20210510-WA0009~2.jpg")`,
										width: "106px",
										height: "106px"
									}}
								/>
							</div>
						) : (
							<img
								src="https://www.w3schools.com/w3images/avatar3.png"
								className="w3-circle"
								id="image1"
								alt="Avatar"
							/>
						)}
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
