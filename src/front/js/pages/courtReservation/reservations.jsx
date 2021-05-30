import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import Reservation from "../../component/courtReservation/reservation.jsx";

import "../../../styles/court-reservation.scss";

export default function Reservations() {
	const { actions, store } = useContext(Context);
	let user = actions.getUser();
	const [reservations, setReservations] = useState(null);

	if (user) {
		useEffect(() => {
			//GET COURTS OF A SPORT CENTER
			fetch(process.env.BACKEND_URL + "/api/prebookings_user/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => setReservations(resultJson));
		}, []);
	}

	return (
		<div className="body ">
			{/* <!-- !PAGE CONTENT! --> */}
			<div className="w3-main ">
				{/* <!-- Header --> */}
				<header className="w3-container ">
					<h5 className="mt-4">
						<div className="text_xlarge pl-4">Mis Reservas</div>
					</h5>
				</header>

				{reservations != null ? (
					<span>
						{reservations.map(reservation => {
							return <Reservation key={reservation.id} reservation={reservation} />;
						})}
					</span>
				) : (
					"Loading"
				)}
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</div>
	);
}
