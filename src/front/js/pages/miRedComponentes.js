import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/mired.scss";
import "w3-css/w3.css";
import MiRedPerfil from "../component/MiRed/miRedPerfil";
import MiRedInterests from "../component/MiRed/miRedInterests";
import MiRedPostText from "../component/MiRed/miRedPostText";
import MiRedPosts from "../component/MiRed/miRedPosts";
import MiRedEvents from "../component/MiRed/miRedEvents";
import MiRedFriendRequest from "../component/MiRed/miRedFriendRequest";

export default function MiRedComponentes() {
	const { actions } = useContext(Context);
	const history = useHistory();

	let user = actions.getUser();
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		let acessToken = actions.getAccessToken();
		if (!acessToken) {
			history.push("/sign");
			return;
		}
		fetch(process.env.BACKEND_URL + "/api/getuser", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				actions.saveUser(responseJson);
			});
	}, []);

	useEffect(
		() => {
			if (user) {
				fetch(process.env.BACKEND_URL + "/api/profile/" + user.id, {
					method: "GET",
					headers: { "Content-Type": "application/json" }
				})
					.then(response => response.json())
					.then(resultJson => setProfile(resultJson));
			}
		},
		[user]
	);

	return (
		<div className="w3-margin-top">
			<div className="w3-col m3">
				<MiRedPerfil />
				<MiRedInterests />
			</div>

			<div className="w3-col m7">
				<MiRedPostText />
				<MiRedPosts />
			</div>
			<div className="w3-col m2">
				<MiRedEvents />
				<MiRedFriendRequest />
			</div>
		</div>
	);
}
