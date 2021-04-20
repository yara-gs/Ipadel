import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/mired.scss";
import "w3-css/w3.css";
import MiRedPerfil from "../component/miRedPerfil";
import MiRedInterests from "../component/miRedInterests";
import MiRedPostText from "../component/miRedPostText";
import MiRedPosts from "../component/miRedPosts";
import MiRedEvents from "../component/miRedEvents";
import MiRedFriendRequest from "../component/miRedFriendRequest";

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
