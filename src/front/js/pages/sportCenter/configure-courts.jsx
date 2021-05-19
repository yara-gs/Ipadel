import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";
import "../../../styles/center.scss";
import "../../../styles/court-reservation.scss";
import { UncontrolledTooltip } from "reactstrap";
import { Alert } from "reactstrap";

import Court from "../../component/sportCenter/court.jsx";
import setTimeout_useEffect from "../../setTimeout";
import pushSignPage from "../../pushSignPage";

export default function ConfigureCourts() {
	const { actions, store } = useContext(Context);

	const [courts, setCourts] = useState(null);
	const [addCourtBtn, setAddCourtBtn] = useState(false);
	const [message, setMessage] = useState("");
	const [showCourtDefaultLabel, setShowCourtDefaultLabel] = useState(false);
	const [courtDefaultLabelInput, setCourtDefaultLabelInput] = useState("");
	const [courtDefaultLabel, setCourtDefaultLabel] = useState("Pista_");

	let DefaultLabel_placeholder = "Etiqueta: " + courtDefaultLabel;
	let user = actions.getUser();
	let sportCenter = actions.getSportCenter();
	let className_addbtn = "";
	let className_showdefaulLabel = "";

	let court_aux = {
		court_name: "",
		light: false,
		players: 4,
		sportcenter_id: ""
	};
	if (sportCenter) {
		court_aux.sportcenter_id = sportCenter.id;
	}

	//funcion que lleva a sign si no hay usario logueado
	pushSignPage();

	if (user != null && sportCenter != null) {
		useEffect(() => {
			//GET COURTS OF A SPORT CENTER
			fetch(process.env.BACKEND_URL + "/api/" + sportCenter.id + "/courts", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => setCourts(resultJson));
		}, []);
	}
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
	function updateCourt(court) {
		setMessage("");
		fetch(process.env.BACKEND_URL + "/api/courtupdate/" + court.id, {
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
	function deleteCourt(court) {
		fetch(process.env.BACKEND_URL + "/api/courtdelete/" + court.id, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(resultJson => {
				setMessage(court.court_name + " eliminada correctamente");
				let arrayCopy = [...courts];
				let arrayPos = arrayCopy.findIndex(item => item.id === court.id);
				arrayCopy.splice(arrayPos, 1);
				setCourts(arrayCopy);
			});
	}

	//Mostrar boton añadir pista activo

	if (addCourtBtn) {
		className_addbtn = "fas fa-plus active";
	} else className_addbtn = "fas fa-plus";

	//Mostrar boton editar etiqueta pista activo
	if (showCourtDefaultLabel) {
		className_showdefaulLabel = "fas fa-cog active";
	} else className_showdefaulLabel = "fas fa-cog ";

	//call funcion setTimeout
	setTimeout_useEffect(message, setMessage, 1500);

	return (
		<div>
			<form className="msform" method="post">
				{sportCenter ? <div className="text_large pb-2"> {sportCenter.center_name}</div> : ""}

				{/* <!-- progressbar --> */}
				<ul className="progressbar">
					<li>Dar de alta</li>
					<li className="active">Configurar Pistas</li>
					<li>Subir imagenes</li>
					<li>Finalizar</li>
				</ul>
			</form>

			<div className="d-flex flex-colum justify-content-center court-icon mt-3 pt-3">
				<div className="flex-colum">
					<div className=" d-flex justify-content-between container-court">
						<div>
							<button
								type="button"
								id="Tooltip_addbtn"
								className={className_addbtn}
								onClick={() => setAddCourtBtn(!addCourtBtn)}
							/>
							<UncontrolledTooltip placement="top" target="Tooltip_addbtn">
								Añadir una pista nueva
							</UncontrolledTooltip>

							<button
								type="button"
								id="Tooltip_configbtn"
								className={className_showdefaulLabel}
								onClick={() => setShowCourtDefaultLabel(!showCourtDefaultLabel)}
							/>
							<UncontrolledTooltip placement="top" target="Tooltip_configbtn">
								Editar etiqueta nombre pistas nuevas
							</UncontrolledTooltip>
						</div>
						<div>
							<span className="next_step">Siguiente Paso</span>
							<Link to="/uploadCenterImages">
								<button
									type="button"
									id="Tooltip_nextstep"
									className="next_stepLink fas fa-chevron-right ml-1"
								/>
							</Link>
							<UncontrolledTooltip placement="top" target="Tooltip_nextstep">
								Finalizar configuracion de pistas
							</UncontrolledTooltip>
						</div>
					</div>

					<div className=" d-flex justify-content-start container-court">
						{showCourtDefaultLabel ? (
							<span>
								<button
									type="button"
									id="Tooltip_discardchanges"
									className=" btn-secondary fas fa-times p-2"
									onClick={() => setShowCourtDefaultLabel(false)}
								/>
								<UncontrolledTooltip placement="top" target="Tooltip_discardchanges">
									Cancelar cambios nombre etiqueta pista
								</UncontrolledTooltip>
								<button
									type="button"
									id="Tooltip_savechanges"
									className=" btn-secondary far fa-save p-2"
									onClick={() => changeDefault_CourtName()}
								/>
								<UncontrolledTooltip placement="top" target="Tooltip_savechanges">
									Guardar cambios nombre etiqueta pista
								</UncontrolledTooltip>
								<input
									className="courtcardInput"
									type="text"
									placeholder={DefaultLabel_placeholder}
									onChange={() => setCourtDefaultLabelInput(event.target.value)}
								/>
							</span>
						) : (
							""
						)}
					</div>
					<div> {message == "" ? "" : <Alert color="warning">{message}</Alert>}</div>
				</div>
			</div>

			<div className="d-flex  justify-content-center ">
				{addCourtBtn ? (
					<span>
						<div className="newcourts_message d-flex justify-content-end">Crear pista nueva</div>
						<Court
							court={court_aux}
							addCourtBtn={true}
							createCourt={createCourt}
							updateCourt={updateCourt}
							deleteCourt={deleteCourt}
							closeNewCourt={closeNewCourt}
						/>
					</span>
				) : (
					""
				)}
			</div>

			<div className=" ">
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
		</div>
	);
}
