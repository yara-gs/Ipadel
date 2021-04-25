import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedPerfil() {
	return (
		<div className="w3-col">
			<div className="w3-card w3-round w3-white">
				<div className="w3-container">
					<h4 className="w3-center">Mi Perfil</h4>
					<p className="w3-center">
						<img
							src="https://www.w3schools.com/w3images/avatar3.png"
							className="w3-circle"
							id="image1"
							alt="Avatar"
						/>
					</p>
					<p>
						<i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme" /> Profesion
					</p>
					<p>
						<i className="fa fa-home fa-fw w3-margin-right w3-text-theme" /> Ciudad, Pais
					</p>
					<p>
						<i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme" /> Fecha de Nacimiento
					</p>
				</div>
			</div>
		</div>
	);
}
