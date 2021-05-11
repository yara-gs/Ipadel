import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";

import "w3-css/w3.css";

export default function MiRedComments(props) {
	return (
		<div className="w3-col">
			<h1>{props.text}</h1>
			<h2>Hola que tla</h2>
		</div>
	);
}

MiRedComments.propTypes = {
	text: PropTypes.string
};
