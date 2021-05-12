import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

import "../../../styles/court-reservation.scss";
import "../../../styles/imgcarousel.scss";

import setTimeout_useEffect from "../../setTimeout";

export default function BookTime(props) {
	const { actions, store } = useContext(Context);
	let user = actions.getUser();
	const [showReservation, setShowReservation] = useState(false);
	const [showReservationBtn, setShowReservationBtn] = useState(true);

	const [message, setMessage] = useState("Confirmar Reserva");

	const handleClose = () => {
		setShowReservation(false);
		setMessage("Confirmar Reserva");
		setShowReservationBtn(true);
	};

	let hour_start = "";
	let availability_players = props.center.capacity;

	if (props.hour < 10) {
		hour_start = "0" + props.hour + ":00";
	} else hour_start = props.hour + ":00";

	let hour_end = props.hour + 1 + ":00";

	let className = "booktime green";

	if (props.prebookings != null && props.center != null) {
		for (let i = 0; i < props.prebookings.length; i++) {
			// console.log(hour_start);
			if (props.prebookings[i].time_start == hour_start) {
				availability_players = props.center.capacity - props.prebookings[i].prebooking_players;

				if (availability_players >= props.players) {
					className = "booktime green";
				} else className = "booktime red";
			}
		}
	}

	if (props.center.capacity < props.players) {
		className = "booktime red";
	}

	//POST NEW PREBOOKING
	function create_prebooking() {
		let body = {
			datetime: props.date + " " + hour_start,
			date: props.date,
			time_start: hour_start,
			time_end: hour_end,
			players: parseInt(props.players),
			sportcenter_id: props.center.id,
			user_id: user.id
		};

		// setMessage("");
		// setError("");

		//envio datos a la base de datos
		fetch(process.env.BACKEND_URL + "/api/prebooking/" + body.sportcenter_id, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then(responseJson => {
				props.updatePrebookings();
				setMessage("Reserva realizada con éxito");
				setShowReservationBtn(false);
			})
			.catch(error => {
				setMessage("Error al procesar la reserva");
			});
	}

	function showConfirmation() {
		if (availability_players >= props.players && props.players > 0) {
			setShowReservation(true);
		} else setShowReservation(false);
	}

	// //call funcion setTimeout
	// setTimeout_useEffect(message, setMessage, 2000);
	return (
		<div className="court-icon">
			<div className="availability_players">{availability_players}</div>

			<button className={className} onClick={() => showConfirmation()}>
				{hour_start}-{hour_end}
			</button>
			<Modal show={showReservation} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-baseball-ball w3-text-amber" /> <strong>{message} </strong>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						<strong>Centro Deportivo: </strong>
						{props.center.center_name}
					</p>
					<strong> Fecha: </strong> {props.date}
					<p>
						<strong> Hora: </strong> {hour_start}-{hour_end}
					</p>
					<p>
						<strong>Jugadores: </strong> {props.players}
					</p>
					<p> </p>
				</Modal.Body>
				<Modal.Footer>
					{showReservationBtn ? (
						<Button onClick={() => create_prebooking()}>Reservar</Button>
					) : (
						<Button onClick={() => handleClose()}>Cerrar</Button>
					)}
				</Modal.Footer>
			</Modal>
		</div>
	);
}

BookTime.propTypes = {
	hour: PropTypes.number,
	prebookings: PropTypes.object,
	center: PropTypes.object,
	players: PropTypes.number,
	date: PropTypes.string,
	updatePrebookings: PropTypes.func
};
