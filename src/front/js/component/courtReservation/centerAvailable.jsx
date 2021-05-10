import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

import "../../../styles/court-reservation.scss";
import "../../../styles/imgcarousel.scss";

import CarouselImages from "../sportCenter/carouselImages.jsx";
import BookTime from "./bookTime.jsx";

export default function CenterAvailable(props) {
	const { actions, store } = useContext(Context);
	const [images, setImages] = useState(null);
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
			if (props.center && images == null) {
				getImages();
			}
			//GET COURTS OF A SPORT CENTER
		},

		[props.date]
	);

	function getImages() {
		//GET COURTS OF A SPORT CENTER
		fetch(process.env.BACKEND_URL + "/api/" + props.center.id + "/images", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(resultJson => {
				setImages(resultJson);
			});
	}

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

	if (images) {
		if (images.length > 0) {
			url_image = images[0].url_image;
		}
	}

	return (
		<div>
			<div className="card mb-4 shadow bg-white rounded " style={{ width: "800px" }}>
				<div className="row">
					<div className="col-md-4 ">
						{/* {props.center && images ? <CarouselImages images={images} slidesToShow={1} dots={false} /> : ""} */}
						<div className="carousel-img" style={{ backgroundImage: `url(${url_image})` }} />
					</div>
					<div className="col-md-8 court-icon">
						<div className="card-body">
							<div className="card-title d-flex justify-content-between">
								<div className="text_large">
									<i className="fas fa-baseball-ball w3-text-amber pr-2" />
									{props.center.center_name}
									<p />
								</div>
								<div className="text-muted text-right">
									<small>
										{props.center.address} {props.center.city}
										<br />
										<div className="text_xs">
											<i className="fas fa-phone pr-1" />
											{props.center.phone}
										</div>
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
