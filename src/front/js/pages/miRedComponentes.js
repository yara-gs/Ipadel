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
