import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedPostText() {
	return (
		<div className="w3-col m7">
			<div className="w3-row-padding">
				<div className="w3-col m12">
					<div className="w3-card w3-round w3-white">
						<div className="w3-container w3-padding">
							<h6 className="w3-opacity">Comparte con tus amigos tu pasion por el padel!</h6>
							<p contentEditable="true" className="w3-border w3-padding">
								Gran partida hoy con los amigos!
							</p>
							<button type="button" className="w3-button w3-theme">
								<i className="fa fa-home" />  Post
							</button>
							<br />
							<button type="button" className="w3-button w3-theme">
								<i className="fa fa-home" />  Post
							</button>
							<br />
							<button type="button" className="w3-button w3-theme">
								<i className="fa fa-home" />  Post
							</button>
							<br />
							<button type="button" className="w3-button w3-theme">
								<i className="fa fa-home" />  Post
							</button>
							<br />
							<button type="button" className="w3-button w3-theme">
								<i className="fa fa-home" />  Post
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
