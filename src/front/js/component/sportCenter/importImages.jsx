import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

import "../../../styles/center.scss";

import setTimeout_useEffect from "../../setTimeout";

export default function ImportImages(props) {
	const { actions, store } = useContext(Context);
	const [centerImages, setCenterImages] = useState([]);
	const [sportCenterId, setSportCenterId] = useState(props.sportCenter_id);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [importing, setImporting] = useState(false);

	function uploadImages() {
		const formData = new FormData();
		setImporting(true);
		formData.append("sportcenter_id", sportCenterId);
		for (let i = 0; i < centerImages.length; i++) {
			let data = "image_" + i;
			formData.append(data, centerImages[i]);
		}

		setMessage("");
		setError("");
		let responseOk = false;

		fetch(process.env.BACKEND_URL + "/api/upload-images", {
			method: "POST",
			body: formData
		})
			.then(response => response.json())
			.then(resultJson => {
				props.importedImages(resultJson);
				setMessage("Imagenes importadas correctamente");
				setImporting(false);
			})

			.catch(error => {
				setError(error.message);
				setImporting(false);
				setMessage("Fallo al importar imagenes");
			});
	}

	setTimeout_useEffect(message, setMessage, 2000);

	return (
		<div className="d-flex justify-content-between court-icon sporCenterImages">
			<form>
				<input type="file" multiple onChange={event => setCenterImages(event.currentTarget.files)} />
			</form>
			<p className="configcourts_message ">{importing ? "Cargando" : message}</p>
			<button onClick={uploadImages}> Save </button>
		</div>
	);
}

ImportImages.propTypes = {
	sportCenter_id: PropTypes.number,
	importedImages: PropTypes.func
};
