import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";

import "../../../styles/center.scss";

import pushSignPage from "../../pushSignPage";

export default function Centers() {
	const { actions, store } = useContext(Context);
	const history = useHistory();

	//funcion que lleva a sign si no hay usario logueado
	pushSignPage();

	return (
		<div>
			{/* <!-- multistep form --> */}
			<form className="msform" method="post">
				{/* <!-- progressbar --> */}
				<ul className="progressbar">
					<li>Dar de alta</li>
					<li>Configurar centro</li>
					<li>Subir imagenes</li>
					<li className="active">Finalizar</li>
				</ul>
			</form>
			<div className="container">
				<div className="d-flex flex-column justify-content-center">
					<h4 className=" fs-title text-center ">Resumen alta centro deportivo</h4>
					<div className="w3-row-padding">
						<div className="w3-col m12">
							<div className="w3-card w3-round w3-white">
								<div className="w3-container w3-padding">
									<button type="button" className="button_publicar w3-button w3-theme">
										<i className="court-icon fas fa-circle fa-xs" />  Publicar
									</button>
									<br />
									<button type="button" className="w3-button w3-theme">
										<i className="court-icon fas fa-circle fa-xs " />
									</button>
									<br />
								</div>
							</div>
						</div>
					</div>
					<table className="styled-table text-center">
						<thead>
							<tr className="text-center">
								<th>Nombre</th>
								<th>NIF</th>
								<th>Tlf</th>
								<th>Dirección</th>
								<th>Web</th>
								<th>Nº Pistas</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Burpadel</td>
								<td>RTE1512</td>
								<td>617985326</td>
								<td>C/Caleruega,25 09002 Burgos</td>
								<td>www.burpadel.com</td>
								<td>10</td>
							</tr>
							<tr className="active-row">
								<td>Burpadel</td>
								<td>RTE1512</td>
								<td>617985326</td>
								<td>C/Caleruega,25 09002 Burgos</td>
								<td>www.burpadel.com</td>
								<td>10</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

{
	/* <div className="w3-row-padding">
					<div className="w3-col m12">
						<div className="w3-card w3-round w3-white">
							<div className="w3-container w3-padding">
								<h6 className="w3-opacity">Comparte con tus amigos tu pasion por el padel!</h6>
								<input className="w3-border w3-padding w3-col m12" type="text" />
								<button type="button" className="button_publicar w3-button w3-theme">
									<i className="fa fa-home" />  Publicar
								</button>
								<br />
								<button type="button" className="w3-button w3-theme">
									<i className="fa fa-home" />
								</button>
								<br />
								<button type="button" className="w3-button w3-theme">
									<i className="fa fa-home" />
								</button>
								<br />
								<button type="button" className="w3-button w3-theme">
									<i className="fa fa-home" />
								</button>
								<br />
								<button type="button" className="w3-button w3-theme">
									<i className="fa fa-home" />
								</button>
							</div>
						</div>
					</div>
				</div>
			*/
}
