import React, { useContext } from "react";
import { Context } from "../store/appContext";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "../../styles/home.scss";

import "w3-css/w3.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<body>
			<div className="w3-display-container w3-animate-opacity w3-center">
				<img
					className="imgHome"
					src="https://www.guia33.com/wp-content/uploads/cache/images/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548-3012022139.jpg"
					alt="boat"
				/>
				<div className="w3-display-middle w3-padding-large w3-wide w3-center">
					<h1 className="w3-hide-medium w3-hide-small w3-xxxlarge w3-text-orange">No te quedes sin jugar</h1>
					<button className="w3-btn w3-round-xlarge w3-center w3-xxlarge">Jugar Ahora </button>
				</div>
			</div>

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
						<img
							className="imgHome"
							src="https://www.guia33.com/wp-content/uploads/cache/images/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548-3012022139.jpg"
							alt="boat"
						/>
					</div>
				</div>
			</div>

			<div className="w3-row-padding w3-light-grey w3-padding-64 w3-container">
				<div className="w3-content">
					<div className="w3-third w3-center">
						<img
							className="imgHome"
							src="https://www.guia33.com/wp-content/uploads/cache/images/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548-3012022139.jpg"
							alt="boat"
						/>
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

			<CardGroup className="mx-1">
				<Card>
					<Card.Img
						variant="top"
						src="https://www.guia33.com/wp-content/uploads/cache/images/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548-3012022139.jpg"
					/>
					<Card.Body>
						<Card.Title>Card title</Card.Title>
						<Card.Text>
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This content is a little bit longer.
						</Card.Text>
						<Button variant="primary">Full Article</Button>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img
						variant="top"
						src="https://www.guia33.com/wp-content/uploads/cache/images/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548-3012022139.jpg"
					/>
					<Card.Body>
						<Card.Title>Card title</Card.Title>
						<Card.Text>
							This card has supporting text below as a natural lead-in to additional content.{" "}
						</Card.Text>
						<Button variant="primary">Full Article</Button>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img
						variant="top"
						src="https://www.guia33.com/wp-content/uploads/cache/images/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548-3012022139.jpg"
					/>
					<Card.Body>
						<Card.Title>Card title</Card.Title>
						<Card.Text>
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This card has even longer content than the first to show that equal height action.
						</Card.Text>
						<Button variant="primary">Full Article</Button>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img
						variant="top"
						src="https://www.guia33.com/wp-content/uploads/cache/images/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548/guia33-sant-just-desvern-club-deportivosocial-sant-just-padel-club-18548-3012022139.jpg"
					/>
					<Card.Body>
						<Card.Title>Card title</Card.Title>
						<Card.Text>
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This card has even longer content than the first to show that equal height action.
						</Card.Text>
						<Button variant="primary">Full Article</Button>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
			</CardGroup>

			<div className="w3-container w3-black w3-center w3-opacity w3-padding-64">
				<h5 className="w3-margin w3-xlarge">Quote of the day: Play with honor</h5>
			</div>
		</body>
	);
};
