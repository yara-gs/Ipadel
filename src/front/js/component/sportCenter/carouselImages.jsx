import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import Slider from "react-slick";

import CarouselItem from "./carouselItem.jsx";

import "../../../styles/center.scss";
import "../../../styles/imgcarousel.scss";

export default function CarouselImages() {
	const { actions, store } = useContext(Context);

	const [images, setImages] = useState(null);
	const [sportCenter, setSportCenter] = useState(actions.getSportCenter());

	useEffect(
		() => {
			// sportCenter = actions.getSportCenter();
			//GET COURTS OF A SPORT CENTER
			if (sportCenter) {
				getImages();
			}
		},

		[]
	);

	function getImages() {
		//GET COURTS OF A SPORT CENTER
		fetch(process.env.BACKEND_URL + "/api/" + sportCenter.id + "/images", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(resultJson => setImages(resultJson));
	}

	function sliders() {
		return images.map(data => {
			return (
				<div key={data}>
					<div>
						<img alt="image" src={data.url_image} />
					</div>
				</div>
			);
		});
	}

	//slick
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 2
	};

	let slides;
	if (images) {
		slides = images.map(char => {
			return <div key={char}>1</div>;
		});
	}

	return (
		<div className="carousel-container col-10 m-auto">
			<div className>{images ? "" : ""}</div>
			{images ? (
				<Slider {...settings} style={{ clear: "both" }}>
					{images.map(image => {
						return (
							// <CarouselItem key={image.url_image} />
							<div className="carousel-item" key={image}>
								<img src={image.url_image} alt="Image" />
							</div>
						);
					})}

					{/* <div className="carousel-item">
						<img src="http://ipadel.s3.amazonaws.com/centerImage_01.jpg" alt="Image" />
					</div> */}
					{/* {slides} */}
				</Slider>
			) : (
				""
			)}
			{/* <Slider {...settings}>
				<div className="carousel-item">
					<img src="http://ipadel.s3.amazonaws.com/centerImage_02.jpg" alt="Image" />
				</div>
				<div className="carousel-item">
					<img src="http://ipadel.s3.amazonaws.com/centerImage_01.jpg" alt="Image" />
				</div>
				<div className="carousel-item">
					<img src="http://ipadel.s3.amazonaws.com/centerImage_03.jpg" alt="Image" />
				</div>
				<div className="carousel-item">
					<img src="http://ipadel.s3.amazonaws.com/centerImage_04.jpg" alt="Image" />
				</div>
				<div className="carousel-item">
					<img src="http://ipadel.s3.amazonaws.com/centerImage_04.jpg" alt="Image" />
				</div>
				<div className="carousel-item">
					<img src="http://ipadel.s3.amazonaws.com/centerImage_04.jpg" alt="Image" />
				</div>
			</Slider> */}
			;
		</div>
	);
}
