import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

import "../../../styles/court-reservation.scss";
import "../../../styles/imgcarousel.scss";

export default function BookTime() {
	const { actions, store } = useContext(Context);

	return (
		<div className="court-icon">
			<button className="booktime red">9:00-10:00</button>
		</div>
	);
}
