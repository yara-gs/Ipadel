import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../styles/center.scss";

import Court from "../../component/sportCenter/court.jsx";
import setTimeout_useEffect from "../../setTimeout";

export default function CenterConfiguration() {
	const [courts, setCourts] = useState(null);
	const [addCourtBtn, setAddCourtBtn] = useState(false);
	const [sportCenterId, setSportCenterId] = useState(null);
	const [message, setMessage] = useState(" ");
	const [showCourtDefaultLabel, setShowCourtDefaultLabel] = useState(false);
	const [courtDefaultLabelInput, setCourtDefaultLabelInput] = useState("");
	const [courtDefaultLabel, setCourtDefaultLabel] = useState("Pista_");
	let DefaultLabel_placeholder = "Etiqueta: " + courtDefaultLabel;

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
		defineDefault_CourtNewName();
	}

	//BUSCAR ETIQUETAS DISPONIBLES PARA PISTAS NUEVAS
	function defineDefault_CourtNewName() {
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

	//GUARDAR ETIQUETA POR DEFECTO PARA PISTAS NUEVAS
	function changeDefault_CourtName() {
		setCourtDefaultLabel(courtDefaultLabelInput);
		setShowCourtDefaultLabel(false);
		setMessage("etiqueta pistas nuevas modificada a : " + courtDefaultLabelInput);
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

	//BORRAR CUADRO CREACION NUEVAS PISTAS
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
				<div className=" courtcard  mb-0 mt-4 d-flex justify-content-start">
					<div className=" court-icon pt-1 ">
						<button
							type="button "
							className=" fas fa-plus p-1 "
							onClick={() => setAddCourtBtn(!addCourtBtn)}
						/>
						{showCourtDefaultLabel == false ? (
							<button
								type="button "
								className=" fas fa-cog p-1"
								onClick={() => setShowCourtDefaultLabel(true)}
							/>
						) : (
							<span>
								<button
									type="button "
									className=" fas fa-times p-1"
									onClick={() => setShowCourtDefaultLabel(false)}
								/>
								<button
									type="button "
									className=" far fa-save p-1"
									onClick={() => changeDefault_CourtName()}
								/>
								<input
									className="courtcardInput"
									type="text"
									placeholder={DefaultLabel_placeholder}
									onChange={() => setCourtDefaultLabelInput(event.target.value)}
								/>
							</span>
						)}
						<span className=" next_step ">Saltar paso</span>

						<Link to="/uploadCenterImages">
							<button type="button " className=" next_stepLink fas fa-chevron-right ml-1 p-1" />
						</Link>

						<p className="configcourts_message mb-0 mt-2 ">{message}</p>
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
				</div>
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
