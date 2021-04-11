import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../styles/center.scss";

export default function Court(props) {
	let obj = props.court;
	// obj.label = inputUpdateValue;
	props.updateCourt(obj);

	return (
		<div className="d-flex justify-content-center ">
			<div className="card courtcard text-dark bg-light mb-3 ">
				<h5 className="card-header">{props.court.court_name}</h5>
				<div className="card-body">
					<div className="card-title">Jugadores : 4</div>
					<p className="card-text"> Luz :{props.court.light ? " Si" : " No"} </p>
				</div>
			</div>
		</div>
	);
}

Court.propTypes = {
	court: PropTypes.object,
	updateCourt: PropTypes.func,
	deleteCourt: PropTypes.func
};
