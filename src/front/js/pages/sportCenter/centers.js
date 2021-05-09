import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import Center from "../../component/sportCenter/center.jsx";

import "../../../styles/court-reservation.scss";

export default function Centers() {
	const { actions, store } = useContext(Context);
	let user = actions.getUser();
	const [centers, setCenters] = useState(null);

	if (user) {
		useEffect(
			() => {
				//GET COURTS OF A SPORT CENTER
				fetch(process.env.BACKEND_URL + "/api/sportcenters/" + user.id, {
					method: "GET",
					headers: { "Content-Type": "application/json" }
				})
					.then(response => response.json())
					.then(resultJson => setCenters(resultJson));
			},

			[]
		);
	}

	return (
		<div>
			{/* <!-- !PAGE CONTENT! --> */}
			<div className="w3-main">
				{/* <!-- Header --> */}
				<header className="w3-container">
					<h5>
						<div className="text_large">
							<i className="fa fa-dashboard" /> Centros deportivos
						</div>
					</h5>
				</header>

				{centers != null ? (
					<span>
						{centers.map(center => {
							return <Center key={center.id} center={center} />;
						})}
					</span>
				) : (
					"Loading"
				)}
			</div>
		</div>
	);
}
