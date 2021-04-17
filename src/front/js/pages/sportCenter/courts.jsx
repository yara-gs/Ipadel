import React, { useState, useEffect } from "react";
import "../../../styles/center.scss";

import Court from "../../component/sportCenter/court.jsx";
import setTimeout_useEffect from "../../setTimeout";

export default function CenterConfiguration() {
	const [courts, setCourts] = useState(null);
	const [addCourtBtn, setAddCourtBtn] = useState(false);
	const [sportCenterId, setSportCenterId] = useState(null);
	const [message, setMessage] = useState(" ");
	const [courtDefaultLabel, setCourtDefaultLabel] = useState("Pista_");

	let court_aux = {
		court_name: "",
		light: false,
		players: 4,
		sportcenter_id: 1
	};

	useEffect(
		() => {
			let sportcenter_id = "1"; //BORRAR
			//GET COURTS OF A SPORT CENTER
			fetch(process.env.BACKEND_URL + "/api/" + sportcenter_id + "/courts", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => setCourts(resultJson));
		},

		[]
	);

	//SELECT CONFIGURE NEW COURT

	if (addCourtBtn && court_aux["court_name"] === "") {
		setDefault_CourNewName();
		console.log("hola");
	}
	//BUSCAR NOMBRES DISPONIBLES PARA PISTAS NUEVAS

	function setDefault_CourNewName() {
		let courtname = "";
		let isNameUsed = false;
		if (courts != null) {
			for (let i = 1; i < courts.length + 2; i++) {
				if (i < 10) {
					courtname = courtDefaultLabel + "00" + i;
				} else if (i >= 10 && i < 100) {
					courtname = courtDefaultLabel + "0" + i;
				} else {
					courtname = courtDefaultLabel + i;
				}

				for (let j = 0; j < courts.length; j++) {
					if (courts[j].court_name === courtname) {
						isNameUsed = true;
					}
				}
				if (isNameUsed == false) {
					court_aux["court_name"] = courtname;
					return;
				}
				isNameUsed = false;
			}
		}
	}

	//SAVE NEW COURT
	function createCourt(court) {
		setMessage("");
		fetch(process.env.BACKEND_URL + "/api/newcourt/", {
			method: "POST",
			body: JSON.stringify(court),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				let arrayCopy = [...courts, responseJson];
				setCourts(arrayCopy);
				setMessage(court.court_name + " creada correctamente");
				court_aux["court_name"] = "";
			});
	}

	//UPDATE COURT
	function updateCourt(court, court_id) {
		console.log(court);
		setMessage("");
		fetch(process.env.BACKEND_URL + "/api/courtupdate/" + court_id, {
			method: "PUT",
			body: JSON.stringify(court),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				let arrayCopy = [...courts];
				let arrayPos = arrayCopy.findIndex(item => item.id === court.id);
				arrayCopy[arrayPos] = court;
				setCourts(arrayCopy);
				setMessage(court.court_name + " se ha modificado correctamente");
			});
	}

	function closeNewCourt() {
		setAddCourtBtn(false);
	}

	//DELETE COURT
	function deleteCourt(court_id) {
		fetch(process.env.BACKEND_URL + "/api/courtdelete/" + court_id, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(resultJson => {
				let arrayCopy = [...courts];
				let arrayPos = arrayCopy.findIndex(item => item.id === court_id);
				arrayCopy.splice(arrayPos, 1);
				setCourts(arrayCopy);
			});
	}

	//call funcion setTimeout
	setTimeout_useEffect(message, setMessage, 2000);

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
			<div className="d-flex justify-content-center  ">
				<div className="card courtcard  mb-2 mt-4 ">
					<div className=" court-icon pt-1">
						<div
							type="button"
							className=" fas fa-plus pl-3 pr-2"
							onClick={() => setAddCourtBtn(!addCourtBtn)}
						/>
						Añadir pista
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-center">
				<p className="configcourts_message mb-0 mt-0 ">{message}</p>
			</div>

			<div>
				{addCourtBtn ? (
					<div className="d-flex justify-content-center  ">
						<div className="card courtcard  mb-2 mt-4 ">
							<div className=" court-icon pt-1">
								<input
									type="text"
									className=" fas fa-plus pl-3 pr-2"
									onChange={() => setCourtDefaultLabel(event.target.value)}
								/>
								Etiqueta
							</div>
						</div>
					</div>
				) : (
					""
				)}
				{addCourtBtn ? (
					<Court
						court={court_aux}
						addCourtBtn={true}
						createCourt={createCourt}
						updateCourt={updateCourt}
						deleteCourt={deleteCourt}
						closeNewCourt={closeNewCourt}
					/>
				) : (
					""
				)}
			</div>

			{courts != null ? (
				<ul>
					{courts.map(court => {
						return (
							<Court
								key={court.id}
								court={court}
								addCourtBtn={false}
								createCourt={createCourt}
								updateCourt={updateCourt}
								deleteCourt={deleteCourt}
								closeNewCourt={closeNewCourt}
							/>
						);
					})}
				</ul>
			) : (
				"Loading"
			)}
		</div>
	);
}
