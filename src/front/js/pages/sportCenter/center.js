import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";

import RegisterCenter from "../../component/sportCenter/centerRegister.jsx";
import "../../../styles/center.scss";

export default function Center() {
	const { actions, store } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		if (store.user === null) {
			history.push("/sign");
			return;
		}
	}, []);

	return (
		<div>
			{/* <!-- multistep form --> */}
			<form className="msform" method="post">
				{/* <!-- progressbar --> */}
				<ul className="progressbar">
					<li className="active">Dar de alta</li>
					<li>Configurar centro</li>
					<li>Subir imagenes</li>
				</ul>
			</form>
			<h4 className=" fs-title d-flex justify-content-center ">Dar de alta un centro deportivo</h4>
			<RegisterCenter />
		</div>
	);
}
