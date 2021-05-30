import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";

import "w3-css/w3.css";

export default function MiRedComments(props) {
	return (
		<div className="w3-col">
			<span> {props.comment_text}</span>
		</div>
	);
}

MiRedComments.propTypes = {
	comment_text: PropTypes.string
};
