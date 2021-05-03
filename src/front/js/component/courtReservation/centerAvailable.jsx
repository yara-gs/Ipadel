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
	let url_image = "http://ipadel.s3.amazonaws.com/centerImage_03.jpg";

	return (
		<div>
			<div className="card mb-3 " style={{ width: "800px" }}>
				<div className="row">
					<div className="col-md-4">
						<div className="carousel-img" style={{ backgroundImage: `url(${url_image})` }} />
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<div className="card-title d-flex justify-content-between">
								<div>
									<i className="fas fa-baseball-ball w3-text-amber" />
									<strong className="pl-2 fs-3">Burpadel</strong>
								</div>
								<small className="text-muted text-right">
									C/Lope de Vega 2<br /> 09002, Burgos
								</small>
							</div>
							<p className="card-text">
								This is a wider card with supporting text below as a natural lead-in to additional
								content. This content is a little bit longer.
							</p>
							<br />
							<div className=" court-icon text-right">
								<button className="p-1">Reservar</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <div className="card mb-3" style={{ max_width: "540px" }} />
			<div className="row g-0">
				<div className="col-md-4">
					<img className="p-2" src="http://ipadel.s3.amazonaws.com/centerImage_03.jpg" alt="" />
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">Card title</h5>
						<p className="card-text">
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This content is a little bit longer.
						</p>
						<p className="card-text">
							<small className="text-muted">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>
            </div> */}
		</div>
	);
}
