import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

import "../../../styles/court-reservation.scss";
import "../../../styles/imgcarousel.scss";

export default function BookTime(props) {
	const { actions, store } = useContext(Context);
	let hour_start = "";

	if (props.hour < 10) {
		hour_start = "0" + props.hour + ":00";
	} else hour_start = props.hour + ":00";

	let hour_end = props.hour + 1 + ":00";

	return (
		<div className="court-icon">
			<button className="booktime red">
				{hour_start}-{hour_end}
			</button>
		</div>
	);
}

BookTime.propTypes = {
	hour: PropTypes.number
};
