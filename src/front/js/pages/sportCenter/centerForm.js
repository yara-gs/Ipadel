import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";

import CenterRegister from "../../component/sportCenter/centerRegister.jsx";
import "../../../styles/center.scss";

export default function CenterForm() {
	const { actions, store } = useContext(Context);
	const history = useHistory();

	return (
		<div className="body-center">
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
			<CenterRegister />
		</div>
	);
}
