import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { ModalBody } from "react-bootstrap";
import "w3-css/w3.css";

export const Home2 = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<div className="jumbotron">
				<div className="container text-center">
					<h1>iPadel?</h1>
					<p>Some text that represents...</p>
				</div>
			</div>

			<div className="container-fluid bg-3 text-center">
				<h3>Ultimas Noticias mundo iPadel..</h3>
				<br />
				<div className="row">
					<div className="col-sm-3">
						<p>Some text..</p>
						<img
							src="https://www.w3schools.com/w3images/lights.jpg"
							className="img-responsive"
							alt="Image"
						/>
					</div>
					<div className="col-sm-3">
						<p>Some text..</p>
						<img
							src="https://www.w3schools.com/w3images/lights.jpg"
							className="img-responsive"
							alt="Image"
						/>
					</div>
					<div className="col-sm-3">
						<p>Some text..</p>
						<img
							src="https://www.w3schools.com/w3images/lights.jpg"
							className="img-responsive"
							alt="Image"
						/>
					</div>
					<div className="col-sm-3">
						<p>Some text..</p>
						<img
							src="https://www.w3schools.com/w3images/lights.jpg"
							className="img-responsive"
							alt="Image"
						/>
					</div>
				</div>
			</div>
			<br />

			<div className="container-fluid bg-3 text-center">
				<div className="row">
					<div className="col-sm-3 mr-2">
						<p>Some text..</p>
						<img
							src="https://www.w3schools.com/w3images/lights.jpg"
							className="img-responsive"
							alt="Image"
						/>
					</div>
					<div className="col-sm-3 mr-2">
						<p>Some text..</p>
						<img
							src="https://www.w3schools.com/w3images/lights.jpg"
							className="img-responsive"
							alt="Image"
						/>
					</div>
					<div className="col-sm-3 mr-2">
						<p>Some text..</p>
						<img
							src="https://www.w3schools.com/w3images/lights.jpg"
							className="img-responsive"
							alt="Image"
						/>
					</div>
					<div className="col-sm-3">
						<p>Some text..</p>
						<img
							src="https://www.w3schools.com/w3images/lights.jpg"
							className="img-responsive"
							alt="Image"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
