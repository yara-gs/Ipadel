import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "../../../styles/center.scss";

import fetchFiles from "../../fetchFunctions";

import { Modal, Button } from "react-bootstrap";

export default function ImportImages() {
	const [centerImages, setCenterImages] = useState([]);
	const [uploadImagesBtn, setUploadImagesBtn] = useState(false);
	const [sportCenterId, setSportCenterId] = useState("1");

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
		formData.append("sportcenter_id", sportCenterId);
		for (let i = 0; i < centerImages.length; i++) {
			let data = "image_" + i;
			formData.append(data, centerImages[i]);
			console.log(formData);
		}

		fetch(process.env.BACKEND_URL + "/api/upload-images", {
			method: "POST",
			body: formData
		}).then(response => response.json());
		// .then(resultJson => setCourts(resultJson));
	}

	return (
		<div>
			<form>
				<input type="file" onChange={event => setCenterImages(event.currentTarget.files)} />
			</form>
			<button onClick={uploadImages}> Save </button>
		</div>
	);
}
