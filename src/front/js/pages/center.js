import React, { useState, useEffect } from "react";

import RegisterCenter from "../component/centerRegister.jsx";
import "../../styles/center.scss";

export default function Center() {
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
