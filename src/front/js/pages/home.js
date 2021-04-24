import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { ModalBody } from "react-bootstrap";
import "w3-css/w3.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<body>
			<header className="w3-container w3-red w3-center" style={{ padding: "128px 16px" }}>
				<h1 className="w3-margin w3-jumbo">Nunca te quedes sin jugar!</h1>

				<button className="w3-button w3-black w3-padding-large w3-large w3-margin-top">Jugar Ahora!</button>
			</header>

			<div className="w3-row-padding w3-padding-64 w3-container">
				<div className="w3-content">
					<div className="w3-twothird">
						<h1>Lorem Ipsum</h1>
						<h5 className="w3-padding-32">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							laboris nisi ut aliquip ex ea commodo consequat.
						</h5>

						<p className="w3-text-grey">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur
							adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
							ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat.
						</p>
					</div>

					<div className="w3-third w3-center">
						<i className="fa fa-anchor w3-padding-64 w3-text-red" />
					</div>
				</div>
			</div>

			<div className="w3-row-padding w3-light-grey w3-padding-64 w3-container">
				<div className="w3-content">
					<div className="w3-third w3-center">
						<i className="fa fa-coffee w3-padding-64 w3-text-red w3-margin-right" />
					</div>

					<div className="w3-twothird">
						<h1>Lorem Ipsum</h1>
						<h5 className="w3-padding-32">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							laboris nisi ut aliquip ex ea commodo consequat.
						</h5>

						<p className="w3-text-grey">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
							laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur
							adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
							ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat.
						</p>
					</div>
				</div>
			</div>

			<div className="w3-container w3-black w3-center w3-opacity w3-padding-64">
				<h1 className="w3-margin w3-xlarge">Quote of the day: live life</h1>
			</div>
		</body>
	);
};
