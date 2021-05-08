import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

import "../../../styles/court-reservation.scss";
import "../../../styles/imgcarousel.scss";

import BookTime from "./bookTime.jsx";

export default function CenterAvailable(props) {
	const { actions, store } = useContext(Context);
	let url_image = "http://ipadel.s3.amazonaws.com/centerImage_03.jpg";
	let opening_hours = [];
	let availabity = [
		{
			time_start: "",
			available_players: 0
		}
	];
	const [prebookings, setPrebookings] = useState(null);

	useEffect(
		() => {
			updatePrebookings();
			//GET COURTS OF A SPORT CENTER
		},

		[props.date]
	);

	function updatePrebookings() {
		fetch(process.env.BACKEND_URL + "/api/getprebookings/" + props.center.id + "/" + props.date, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				setPrebookings(responseJson);
			})
			.catch(error => {
				// setError(error.message);
			});
	}

	if (props.center) {
		let total_hours = props.center.closing_time - props.center.opening_time;
		for (let i = 0; i < total_hours; i++) {
			opening_hours[i] = props.center.opening_time + i;
		}
	}

	return (
		<div>
			<div className="card mb-4 shadow bg-white rounded " style={{ width: "800px" }}>
				<div className="row">
					<div className="col-md-4">
						<div className="carousel-img" style={{ backgroundImage: `url(${url_image})` }} />
					</div>
					<div className="col-md-8 court-icon">
						<div className="card-body">
							<div className="card-title d-flex justify-content-between">
								<div>
									<i className="fas fa-baseball-ball w3-text-amber" />
									<strong className="pl-2 fs-3">{props.center.center_name}</strong>
									<p />
								</div>
								<div className="text-muted text-right">
									<small>
										{props.center.address} {props.center.city}
										<br />
										<span className="fas fa-phone"> {props.center.phone}</span>
									</small>
								</div>
							</div>
							<div className="d-flex align-content-end flex-wrap">
								{opening_hours.map(hour => {
									return (
										<BookTime
											key={hour}
											hour={hour}
											prebookings={prebookings}
											center={props.center}
											players={props.players}
											date={props.date}
											updatePrebookings={updatePrebookings}
										/>
									);
								})}
							</div>

							<br />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

CenterAvailable.propTypes = {
	center: PropTypes.object,
	date: PropTypes.string,
	players: PropTypes.number
};
