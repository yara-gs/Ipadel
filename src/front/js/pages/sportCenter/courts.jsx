import React, { useState, useEffect } from "react";
import "../../../styles/center.scss";

import Court from "../../component/sportCenter/court.jsx";

export default function CenterConfiguration() {
	const [center_name, setCenter_Name] = useState("");
	const [courts, setCourts] = useState(null);

	useEffect(
		() => {
			//GET COURTS OF A SPORT CENTER
			fetch(process.env.BACKEND_URL + "/api/sportcenters/1", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => setCourts(resultJson.courts));
		},

		[]
	);

	//UPDATE COURT
	function updateCourt(court) {
		// fetch(process.env.BASENAME + "todos/" + todo.id, {
		// 	method: "PUT",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify(todo)
		// })
		// 	.then(response => response.json())
		// 	.then(resultJson => {
		// 		let arrayCopy = [...todos];
		// 		let arrayPos = arrayCopy.findIndex(item => item.id === todo.id);
		// 		arrayCopy[arrayPos] = todo;
		// 		setTodos(arrayCopy);
		// 	});
	}

	//DELETE COURT
	function deleteCourt(id) {
		// fetch(process.env.BASENAME + "todos/" + id, {
		// 	method: "DELETE",
		// 	headers: { "Content-Type": "application/json" }
		// })
		// 	.then(response => response.json())
		// 	.then(resultJson => {
		// 		let arrayCopy = [...todos];
		// 		let arrayPos = arrayCopy.findIndex(item => item.id === id);
		// 		arrayCopy.splice(arrayPos, 1);
		// 		setTodos(arrayCopy);
		// 	});
	}

	return (
		<div className="container">
			<h4 className=" fs-title d-flex justify-content-center ">Configuracion Pistas</h4>
			{courts != null ? (
				<ul>
					{courts.map(court => {
						return (
							<Court key={court.id} court={court} updateCourt={updateCourt} deleteCourt={deleteCourt} />
						);
					})}
				</ul>
			) : (
				"Loading"
			)}
		</div>
	);
}
