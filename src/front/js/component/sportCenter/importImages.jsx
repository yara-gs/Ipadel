import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../styles/center.scss";

import { Modal, Button } from "react-bootstrap";

export default function ImportImages() {
	return (
		<div>
			<form>
				<label>
					Imagen
					<input type="file" />
				</label>
			</form>
		</div>
	);
}
