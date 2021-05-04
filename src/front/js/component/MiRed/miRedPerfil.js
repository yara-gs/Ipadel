import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedPerfil() {
	const { actions, store } = useContext(Context);
	const [profile, setProfile] = useState(null);
	const [city, setCity] = useState("");
	let user = actions.getUser();

	if (user !== null) {
		useEffect(() => {
			fetch("https://3001-gray-mouse-66g1qyrp.ws-eu04.gitpod.io/api/profile/1", {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
					// 'Content-Type': 'application/x-www-form-urlencoded',
				}
			})
				.then(response => {
					console.log(response);
					console.log(response);
					console.log(response);
					console.log(response);
					return response.json();
				})
				.then(responseJson => {
					console.log(responseJson);
					setProfile(responseJson);
				});
		}, []);
	}
	return (
		<div className="w3-col">
			<div className="w3-card w3-round w3-white">
				<div className="w3-container">
					{user ? <h4 className="w3-center">{user.username}</h4> : ""}

					<p className="w3-center">
						<img
							src="https://www.w3schools.com/w3images/avatar3.png"
							className="w3-circle"
							id="image1"
							alt="Avatar"
						/>
					</p>
					<p>
						<i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme" /> Profesion
					</p>
					<p>
						<i className="fa fa-home fa-fw w3-margin-right w3-text-theme" /> {}, Pais
					</p>
					<p>
						<i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme" /> Fecha de Nacimiento
					</p>
				</div>
			</div>
		</div>
	);
}
