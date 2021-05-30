import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

import "../../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedFriend(props) {
	let user_url_image = props.friend.url_image;

	if (props.friend.url_image == "") {
		user_url_image = "https://www.w3schools.com/w3images/avatar2.png";
	} else user_url_image = props.friend.url_image;

	return (
		<span className="mr-auto pr-2">
			<div
				className="user-image w3-circle"
				style={{
					backgroundImage: `url(${user_url_image})`,
					width: "30px",
					height: "30px"
				}}
			/>
			<p className=" p-1 text_xs">{props.friend.username}</p>
		</span>
	);
}

MiRedFriend.propTypes = {
	friend: PropTypes.obj
};
