import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import "../../../styles/court-reservation.scss";

export default function Reservation(props) {
	const { actions, store } = useContext(Context);
	const history = useHistory();

	return (
		<div className="w3-panel">
			<div className="w3-row-padding">
				<div className="w3-twothird table-reservations">
					<table className="w3-table w3-white w3-card-4 ">
						<tr>
							<td className="first-column">
								<i className="fas fa-baseball-ball w3-text-amber  " />
								Centro:
							</td>
							<td>{props.reservation.center_name}</td>
						</tr>

						<tr>
							<td className="first-column">
								<i className="fas fa-calendar w3-text-red w3-large" />
								Fecha:
							</td>
							<td>{props.reservation.datetime}</td>
						</tr>
						<tr>
							<td className="first-column">
								<i className="fas fa-male w3-text-blue w3-large" />
								Jugadores :
							</td>
							<td>{props.reservation.players}</td>
						</tr>
						<tr>
							<td className="first-column">
								{props.reservation.isConfirm ? (
									<i className="far fa-check-circle w3-text-green w3-large" />
								) : (
									<i className="fas fa-hourglass-half w3-text-grey w3-large" />
								)}
								Estado Reserva :
							</td>
							<td>
								{props.reservation.isConfirm ? (
									<span className=" w3-text-green">
										{" "}
										<strong>Confirmada</strong>{" "}
									</span>
								) : (
									"En espera"
								)}
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	);
}

Reservation.propTypes = {
	reservation: PropTypes.object
};
