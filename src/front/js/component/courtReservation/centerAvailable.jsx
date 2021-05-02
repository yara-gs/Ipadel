import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";

import "../../../styles/court-reservation.scss";
import "../../../styles/imgcarousel.scss";

export default function CenterAvailable() {
	const { actions, store } = useContext(Context);
	const history = useHistory();

	//funcion que lleva a sign si no hay usario logueado
	// pushSignPage();

	return (
		<div>
			<div className="w3-panel">
				<div className="w3-row-padding">
					<div className="w3-twothird">
						<table className="w3-table w3-striped w3-white w3-card-4  ">
							<tr>
								<td className="first-column carousel-item">
									<div
										className="carousel-img"
										style={{
											backgroundImage: `url("http://ipadel.s3.amazonaws.com/centerImage_03.jpg")`,
											width: "500px"
										}}
									/>
								</td>
							</tr>

							<tr>
								<td className="first-column">
									<i className="fas fa-baseball-ball w3-text-amber  " />
									Centro
								</td>
								<td>Burpadel</td>
								<td>
									<button className="fas fa-pen center-edit-btn" />
								</td>
							</tr>

							<tr>
								<td className="first-column">
									<i className="far fa-file w3-text-gray " />
									NIF
								</td>
								<td>754125daf7e1</td>
								<td>
									<button className="fas fa-pen center-edit-btn" />
								</td>
							</tr>
							<tr>
								<td className="first-column">
									<i className="fas fa-map-marker w3-text-red w3-large" />
									Dirección
								</td>
								<td>C/ Lopez Bravo, 2 09001 Burgos</td>
								<td>
									<button className="fas fa-pen center-edit-btn" />
								</td>
							</tr>
							<tr>
								<td className="first-column">
									<i className="fas fa-phone w3-text-grey w3-large" />
									Tlf
								</td>
								<td>61789562</td>
								<td>
									<button className="fas fa-pen center-edit-btn" />
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
