import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { ModalBody } from "react-bootstrap";
import "w3-css/w3.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<header className="w3-display-container w3-content w3-wide" id="home">
				<img
					className="w3-image"
					src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Random_Turtle.jpg"
					alt="Architecture"
					width="1500"
					height="800"
				/>
				<div className="w3-display-middle w3-margin-top w3-center">
					<h1 className="w3-xxlarge w3-text-white">
						<span className="w3-padding w3-black w3-opacity-min">
							<b>i</b>
						</span>{" "}
						<span className="w3-hide-small w3-text-light-grey">Padel?</span>
					</h1>
				</div>
			</header>
			<div className="w3-content w3-padding" id="home1">
				<div className="w3-container w3-padding-32" id="projects">
					<h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Projects</h3>
				</div>
			</div>
		</div>
	);
};
