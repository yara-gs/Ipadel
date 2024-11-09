
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";

import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import "../../../styles/center.scss";
import "../../../styles/imgcarousel.scss";

import ImportImages from "../../component/sportCenter/importImages.jsx";
import CarouselImages from "../../component/sportCenter/carouselImages.jsx";
import setTimeout_useEffect from "../../setTimeout";

export default function CenterImages() {
	const { actions, store } = useContext(Context);
	const history = useHistory();
	const [message, setMessage] = useState(" ");
	const [images, setImages] = useState(null);
	const [sportCenter, setSportCenter] = useState(actions.getSportCenter());

	useEffect(() => {
		//GET COURTS OF A SPORT CENTER
		if (sportCenter) {
			getImages();
		}
	}, []);

	function getImages() {
		//GET COURTS OF A SPORT CENTER
		fetch(process.env.BACKEND_URL + "/api/" + sportCenter.id + "/images", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(resultJson => {
				setImages(resultJson);
			});
	}

	function importedImages(importedImages) {
		let ArrayCopy = [...images];
		for (let i = 0; i < importedImages.length; i++) {
			ArrayCopy.push(importedImages[i]);
		}
		setImages(ArrayCopy);
	}

	return (
		<div className="body">
			<form className="msform" method="post">
				<div className="text_large pb-2"> {sportCenter.center_name}</div>
				{/* <!-- progressbar --> */}
				<ul className="progressbar">
					<li>Dar de alta</li>
					<li>Configurar Pistas</li>
					<li className="active">Subir imagenes</li>
					<li>Finalizar</li>
				</ul>
			</form>

			<div className="d-flex flex-colum justify-content-center court-icon mt-3 pt-3">
				<div className="flex-colum">
					<div className=" d-flex justify-content-between container-court">
						<div>
							<Link to="/configure-courts">
								<button type="button " className="fas fa-chevron-left p-1" />
							</Link>
							<p>
								<span className="next_step">Pistas</span>
							</p>
						</div>
						<div>
							{sportCenter ? (
								<ImportImages sportCenter_id={sportCenter.id} importedImages={importedImages} />
							) : (
								""
							)}
						</div>
						<div>
							<Link to="/centers">
								<button type="button " className=" next_stepLink fas fa-chevron-right ml-1 p-1" />
							</Link>
							<p>
								<span className="next_step">Finalizar </span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-3">
				{sportCenter && images ? <CarouselImages images={images} slidesToShow={5} dots={true} /> : ""}
			</div>
		</div>
	);
}
