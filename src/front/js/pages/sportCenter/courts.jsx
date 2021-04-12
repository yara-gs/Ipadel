import React, { useState, useEffect } from "react";
import "../../../styles/center.scss";

import Court from "../../component/sportCenter/court.jsx";

export default function CenterConfiguration() {
	const [courts, setCourts] = useState(null);
    const [addCourt, setAddCourt] = useState(false);
    const [borraraddCourt, setAddCourt] = useState(false);
   

	let court_aux = {
		court_name: "Nueva Pista",
		light: false,
		players: null
	};

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
		<div>
			<form className="msform" method="post">
				{/* <!-- progressbar --> */}
				<ul className="progressbar">
					<li>Dar de alta</li>
					<li className="active">Configurar Pistas</li>
					<li>Subir imagenes</li>
				</ul>
			</form>
			<div className="d-flex justify-content-center ">
				<div className="card courtcard  mb-3 mt-4 ">
					<div className=" court-icon pt-1">
						<div type="button" className=" fas fa-plus pl-3 pr-2" onClick={() => setAddCourt(!addCourt)} />
						Añadir pista
					</div>
				</div>
			</div>

			<div>{addCourt ? <Court court={court_aux} updateCourt={updateCourt} deleteCourt={deleteCourt} /> : ""}</div>

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
