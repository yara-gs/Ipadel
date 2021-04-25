import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "../../../styles/center.scss";

import fetchFiles from "../../fetchFunctions";
import setTimeout_useEffect from "../../setTimeout";

export default function ImportImages(props) {
	const [centerImages, setCenterImages] = useState([]);
	const [uploadImagesBtn, setUploadImagesBtn] = useState(false);
	const [sportCenterId, setSportCenterId] = useState(props.sportCenter_id);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [importing, setImporting] = useState(false);

	// async function uploadImages(event) {
	// 	const formData = new FormData();
	// 	formData.append("sportcenter_id", sportCenterId);
	// 	for (let i = 0; i < centerImages.length; i++) {
	// 		formData.append("image_" + i, setCenterImages[i]);
	// 	}
	// 	await fetchFiles(process.env.BACKEND_URL + "/api/upload-images", formData);
	// }

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
			.then(response => {
				responseOk = response.ok;
				if (response.ok) {
					setMessage("Imagenes importadas correctamente");
				} else {
					setMessage("Fallo al importar imagenes");
				}
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
		<div>
			<form>
				<input type="file" multiple onChange={event => setCenterImages(event.currentTarget.files)} />
			</form>
			<p className="configcourts_message mb-0 mt-2 ">{importing ? "Cargando" : message}</p>
			<button onClick={uploadImages}> Save </button>
		</div>
	);
}

ImportImages.propTypes = {
	sportCenter_id: PropTypes.number
};
