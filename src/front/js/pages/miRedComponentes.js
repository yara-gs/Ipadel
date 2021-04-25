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
	const [user, setUser] = useState("");

	useEffect(() => {
		let acessToken = actions.getAccessToken();
		setUser(actions.saveUser());
		if (!acessToken) {
			history.push("/login");
			return;
		}
		fetch(process.env.BACKEND_URL + "/api/profile", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				setUser(responseJson);
				actions.saveUser(responseJson);
			});
	}, []);

	return (
		<div className="w3-margin-top">
			<MiRedPerfil />
			<MiRedPostText />
			<MiRedEvents />
			<MiRedInterests />
			<MiRedPosts />
			<MiRedFriendRequest />
		</div>
	);
}
