import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";

import RegisterCenter from "../../component/sportCenter/centerRegister.jsx";
import "../../../styles/center.scss";

import pushSignPage from "../../pushSignPage";

export default function CenterForm() {
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
					<li className="active">Dar de alta</li>
					<li>Configurar centro</li>
					<li>Subir imagenes</li>
					<li>Finalizar</li>
				</ul>
			</form>
			<h4 className=" fs-title d-flex justify-content-center ">Dar de alta un centro deportivo</h4>
			<RegisterCenter />
		</div>
	);
}
