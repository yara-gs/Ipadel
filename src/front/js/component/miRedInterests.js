import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedInterests() {
	return (
		<div className="w3-col m3">
			<div className="w3-card w3-round w3-white w3-hide-small">
				<div className="w3-container">
					<p>Me Interesan</p>
					<p>
						<span className="w3-tag w3-small w3-theme-d5">Noticias</span>
						<span className="w3-tag w3-small w3-theme-d4">Juegos</span>
						<span className="w3-tag w3-small w3-theme-d3">Deportes</span>
						<span className="w3-tag w3-small w3-theme-d2">Padel</span>
						<span className="w3-tag w3-small w3-theme-d1">Amigos</span>
						<span className="w3-tag w3-small w3-theme">Competicion</span>
						<span className="w3-tag w3-small w3-theme-l1">Raquetas</span>
						<span className="w3-tag w3-small w3-theme-l2">Cine</span>
						<span className="w3-tag w3-small w3-theme-l3">Comida</span>
						<span className="w3-tag w3-small w3-theme-l4">Arte</span>
						<span className="w3-tag w3-small w3-theme-l5">Fotos</span>
					</p>
				</div>
			</div>
		</div>
	);
}
