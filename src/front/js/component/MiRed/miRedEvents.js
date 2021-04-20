import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";
import "../../../styles/modal.scss";
import "w3-css/w3.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function MiRedEvents() {
	const [show, setShow] = useState(false);

	return (
		<div className="w3-col m2">
			<div className="w3-card w3-round w3-white w3-center">
				<div className="w3-container">
					<p>Proximos Eventos:</p>
					<img src="https://www.w3schools.com/w3images/forest.jpg" alt="Forest" id="image12" />
					<p>
						<strong>Torneo</strong>
					</p>
					<p>Viernes 15:00</p>
					<p>
						<Button variant="primary" onClick={() => setShow(true)}>
							+Info
						</Button>
					</p>

					<Modal
						size="lg"
						show={show}
						onHide={() => setShow(false)}
						dialogClassName="modal-150w"
						aria-labelledby="example-custom-modal-styling-title">
						<Modal.Header closeButton>
							<Modal.Title id="example-custom-modal-styling-title">Super Torneo Amateur!</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ul className="modalUl">
								<li>
									Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde commodi
									aspernatur enim, consectetur. Cumque deleniti temporibus
								</li>
								<br />
								<li>
									{" "}
									ipsam atque a dolores quisquam quisquam adipisci possimus laboriosam. Quibusdam
									facilis doloribus debitis!
								</li>
								<br />
								<li> Sit quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!</li>
								<br />
								<li>
									{" "}
									Mollitia reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
									deleniti rem!
								</li>
								<br />
								<li>
									{" "}
									Mollitia reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
									deleniti rem!
								</li>
							</ul>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="primary">Apuntate!</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
		</div>
	);
}
