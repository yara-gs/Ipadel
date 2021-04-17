import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedFriendRequest() {
	return (
		<div className="w3-col m2">
			<div className="w3-card w3-round w3-white w3-center">
				<div className="w3-container">
					<p>Friend Request</p>
					<img src="https://www.w3schools.com/w3images/avatar6.png" alt="Avatar" id="image13" />
					<br />
					<span>Jane Doe</span>
					<div className="w3-row w3-opacity">
						<div className="w3-half">
							<button className="w3-button w3-block w3-green w3-section" title="Accept">
								<i className="fa fa-check" />
							</button>
						</div>
						<div className="w3-half">
							<button className="w3-button w3-block w3-red w3-section" title="Decline">
								<i className="fa fa-remove" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
