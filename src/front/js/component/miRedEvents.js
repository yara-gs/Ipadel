import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedEvents() {
	return (
		<div className="w3-col m2">
			<div className="w3-card w3-round w3-white w3-center">
				<div className="w3-container">
					<p>Proximos Eventos:</p>
					<img src="https://www.w3schools.com/w3images/forest.jpg" alt="Forest" id="image12" />
					<p>
						<strong>Torneo</strong>
					</p>
					<p>Viernes 15:00</p>
					<p>
						<button className="w3-btn w3-khaki w3-block w3-theme-l2">Info</button>
					</p>
				</div>
			</div>
		</div>
	);
}
