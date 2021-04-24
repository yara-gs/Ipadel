import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/mired.scss";
import "w3-css/w3.css";
import MiRedPerfil from "../component/MiRed/miRedPerfil";
import MiRedInterests from "../component/MiRed/miRedInterests";
import MiRedPostText from "../component/MiRed/miRedPostText";
import MiRedPosts from "../component/MiRed/miRedPosts";
import MiRedEvents from "../component/MiRed/miRedEvents";
import MiRedFriendRequest from "../component/MiRed/miRedFriendRequest";

export default function MiRedComponentes() {
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
