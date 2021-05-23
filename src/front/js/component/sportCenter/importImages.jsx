import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import { UncontrolledTooltip } from "reactstrap";

import "../../../styles/center.scss";

import setTimeout_useEffect from "../../setTimeout";

export default function ImportImages(props) {
	const { actions, store } = useContext(Context);
	const fileInput = useRef(null);

	const [centerImages, setCenterImages] = useState("");
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
				setCenterImages("");
			})

			.catch(error => {
				setError(error.message);
				setImporting(false);
				setCenterImages("");
				setMessage("Fallo al importar imagenes");
			});
	}

	setTimeout_useEffect(message, setMessage, 2000);

	const onBtnClick = () => {
		/*Collecting node-element and performing click*/
		fileInput.current.click();
		setImporting(true);
	};

	let width = "80px";
	if (importing) {
		width = "45px";
	} else {
		width = "80px";
	}

	return (
		<div>
			<div className=" d-flex justify-content-start container-court">
				<div className="upload-img">
					<input
						type="file"
						name="image"
						ref={fileInput}
						multiple
						onChange={event => setCenterImages(event.currentTarget.files)}
						style={{ display: "none" }}
					/>

					<button
						type="button"
						className=" far fa-images"
						id="Tooltip_addbtn"
						onClick={onBtnClick}
						style={{ width: width }}
					/>

					<UncontrolledTooltip placement="bottom" target="Tooltip_addbtn">
						Cargar imagenes
					</UncontrolledTooltip>
				</div>

				<div>
					{centerImages !== "" ? (
						<span className="">
							<button id="Tooltip_savebtn" className="far fa-save" onClick={uploadImages}></button>
							{centerImages !== "" ? <span className="text_xs">{centerImages.length} imagenes</span> : ""}
							<UncontrolledTooltip placement="bottom" target="Tooltip_savebtn">
								Guardar imagenes
							</UncontrolledTooltip>
						</span>
					) : (
						""
					)}
				</div>
			</div>

			<p className="configcourts_message ">{importing ? "" : message}</p>
		</div>
	);
}

ImportImages.propTypes = {
	sportCenter_id: PropTypes.number,
	importedImages: PropTypes.func
};
