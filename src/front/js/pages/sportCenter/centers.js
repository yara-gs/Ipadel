import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import Center from "../../component/sportCenter/center.jsx";

import "../../../styles/court-reservation.scss";

import pushSignPage from "../../pushSignPage";

export default function Centers() {
	const { actions, store } = useContext(Context);
	let user = actions.getUser();
	const [centers, setCenters] = useState(null);

	if (user) {
		useEffect(() => {
			//GET COURTS OF A SPORT CENTER
			fetch(process.env.BACKEND_URL + "/api/sportcenters/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => setCenters(resultJson));
		}, []);
	}

	//funcion que lleva a sign si no hay usario logueado
	pushSignPage();

	return (
		<div className="body-centers">
			{/* <!-- !PAGE CONTENT! --> */}
			<div className="w3-main">
				{/* <!-- Header --> */}
				<header className="header ">
					<h5 className="mt-4">
						<div className="text_xlarge pl-4">Centros deportivos</div>
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
