import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";

import "w3-css/w3.css";

export default function MiRedComments(props) {
	return (
		<div className="w3-col d-flex justify-content-between">
			<div> {props.comment.text}</div>{" "}
			<div className=" text_xs">
				{" "}
				{props.comment.username} / {props.comment.datetime}{" "}
			</div>
		</div>
	);
}

MiRedComments.propTypes = {
	comment: PropTypes.obj
};
