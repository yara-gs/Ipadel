import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import "../../../styles/court-reservation.scss";
import "../../../styles/imgcarousel.scss";

import BookTime from "./bookTime.jsx";

export default function CenterAvailable() {
	const { actions, store } = useContext(Context);
	let url_image = "http://ipadel.s3.amazonaws.com/centerImage_03.jpg";

	return (
		<div>
			<div className="card mb-4 shadow bg-white rounded " style={{ width: "800px" }}>
				<div className="row">
					<div className="col-md-4">
						<div className="carousel-img" style={{ backgroundImage: `url(${url_image})` }} />
					</div>
					<div className="col-md-8 court-icon">
						<div className="card-body">
							<div className="card-title d-flex justify-content-between">
								<div>
									<i className="fas fa-baseball-ball w3-text-amber" />
									<strong className="pl-2 fs-3">Burpadel</strong>
									<p />
								</div>
								<div className="text-muted text-right">
									<small>
										C/Lope de Vega 2 09002, Burgos
										<br />
										<span className="fas fa-phone"> 68954879</span>
									</small>
								</div>
							</div>
							<div className="d-flex align-content-end flex-wrap">
								<BookTime />
								<BookTime />
								<BookTime />
								<BookTime />
								<BookTime />
								<BookTime />
								<BookTime />
								<BookTime />
								<BookTime />
								<BookTime />
								<BookTime />
								<BookTime />
								<BookTime />
								<BookTime />
							</div>

							<br />
							<div className=" court-icon ">
								<button className="p-1">Reservar</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
