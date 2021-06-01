import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";

import "w3-css/w3.css";

export default function MiRedComments(props) {
	return (
		<div className="media border p-3 w3-margin-bottom">
			<img
				src="https://www.w3schools.com/w3images/avatar2.png"
				alt="Avatar"
				className="w3-left w3-circle w3-margin-right"
				style={{ width: "35px" }}
			/>

			<div className="media-body w3-display-container">
				<h4 className="w3-text-blue">{props.comment.username} </h4>
				<p> {props.comment.text}</p>
				<small>
					<i className="w3-display-bottomright">{props.comment.datetime}</i>
				</small>
			</div>
		</div>
	);
}

MiRedComments.propTypes = {
	comment: PropTypes.obj
};
