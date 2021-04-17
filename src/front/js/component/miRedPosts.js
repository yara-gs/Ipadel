import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedPosts() {
	return (
		<div className="w3-col m7">
			<div className="w3-container w3-card w3-white w3-round w3-margin">
				<br />
				<img
					src="https://www.w3schools.com/w3images/avatar2.png"
					alt="Avatar"
					className="w3-left w3-circle w3-margin-right"
					id="image7"
				/>
				<span className="w3-right w3-opacity">1 min</span>
				<h4>John Doe</h4>
				<br />
				<hr className="w3-clear" />
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.
				</p>
				<div className="w3-row-padding" id="container2">
					<div className="w3-half">
						<img
							src="https://www.w3schools.com/w3images/lights.jpg"
							id="image8"
							alt="Northern Lights"
							className="w3-margin-bottom"
						/>
					</div>
					<div className="w3-half">
						<img
							src="https://www.w3schools.com/w3images/nature.jpg"
							id="image9"
							alt="Nature"
							className="w3-margin-bottom"
						/>
					</div>
				</div>
				<button type="button" className="w3-button w3-theme-d1 w3-margin-bottom">
					<i className="fa fa-thumbs-up" />  Like
				</button>
				<button type="button" className="w3-button w3-theme-d2 w3-margin-bottom">
					<i className="fa fa-comment" />  Comment
				</button>
			</div>
		</div>
	);
}
