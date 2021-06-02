import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";

import "w3-css/w3.css";

export default function MiRedComments(props) {
	let user_url_image = "https://www.w3schools.com/w3images/avatar2.png";
	if (props.comment.user_url_image === "") {
		user_url_image = "https://www.w3schools.com/w3images/avatar2.png";
	} else user_url_image = props.comment.user_url_image;
	return (
		<div className="media border p-3 w3-margin-bottom">
			{/* <img
				src="https://www.w3schools.com/w3images/avatar2.png"
				alt="Avatar"
				className="w3-left w3-circle w3-margin-right"
				style={{ width: "35px" }}
			/> */}

			<div className="media-body w3-display-container">
				<div
					className="user-image w3-left w3-circle w3-margin-right"
					style={{
						backgroundImage: `url(${user_url_image})`,
						width: "30px",
						height: "30px"
					}}
				/>
				<span className="w3-text-blue text_commento_name ">{props.comment.username} </span>
				<p className="text_s"> {props.comment.text}</p>
				<small>
					<i className="w3-display-bottomright text_xs">{props.comment.datetime}</i>
				</small>
			</div>
		</div>
	);
}

MiRedComments.propTypes = {
	comment: PropTypes.obj
};
