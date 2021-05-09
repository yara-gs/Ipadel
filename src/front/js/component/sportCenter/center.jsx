import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import CarouselImages from "./carouselImages.jsx";

import "../../../styles/court-reservation.scss";

export default function Center(props) {
	const { actions, store } = useContext(Context);
	const history = useHistory();

	const [sportCenter, setSportCenter] = useState(actions.getSportCenter());
	const [images, setImages] = useState(null);

	useEffect(
		() => {
			//GET COURTS OF A SPORT CENTER
			if (sportCenter) {
				getImages();
			}
		},

		[]
	);

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

	function editSportCenter() {
		actions.saveSportCenter(props.center);
		history.push("/configure-courts");
	}

	return (
		<div className="w3-panel">
			<div className="w3-row-padding">
				<div className="w3-twothird">
					<table className="w3-table w3-striped w3-white w3-card-4  ">
						<tr>
							<td className="first-column">
								<i className="fas fa-baseball-ball w3-text-amber  " />
								Centro
							</td>
							<td className="">{props.center.center_name}</td>
							<td>
								<button className="fas fa-pen center-edit-btn" />
							</td>
						</tr>

						<tr>
							<td className="first-column">
								<i className="far fa-file w3-text-gray " />
								CIF
							</td>
							<td>{props.center.nif}</td>
							<td>
								<button className="fas fa-pen center-edit-btn" />
							</td>
						</tr>
						<tr>
							<td className="first-column">
								<i className="fas fa-map-marker-alt w3-text-red w3-large" />
								Dirección
							</td>
							<td>
								{props.center.address} {props.center.cp} {props.center.city}
							</td>
							<td>
								<button className="fas fa-pen center-edit-btn" />
							</td>
						</tr>
						<tr>
							<td className="first-column">
								<i className="fas fa-phone w3-text-grey w3-large" />
								Tlf
							</td>
							<td>{props.center.phone}</td>
							<td>
								<button className="fas fa-pen center-edit-btn" />
							</td>
						</tr>
						<tr>
							<td className="first-column">
								<i className="fas fa-globe w3-text-blue w3-large" />
								Web
							</td>
							<td>{props.center.webpage}</td>
							<td>
								<button className="fas fa-pen center-edit-btn" />
							</td>
						</tr>
						<tr>
							<td className="first-column">
								<i className="fas fa-list-ol w3-text-teal w3-large" />
								Pistas
							</td>
							<td />
							<td>
								<button className="fas fa-pen center-edit-btn" onClick={() => editSportCenter()} />
							</td>
						</tr>
					</table>

					<div className=" mt-3 mb-6 ">
						{sportCenter && images ? <CarouselImages images={images} slidesToShow={3} dots={false} /> : ""}
					</div>

					<br />
					<br />
				</div>
			</div>
		</div>
	);
}

Center.propTypes = {
	center: PropTypes.object,
	addCourtBtn: PropTypes.boolean,
	createCourt: PropTypes.func,
	updateCourt: PropTypes.func,
	deleteCourt: PropTypes.func,
	closeNewCourt: PropTypes.func
};
