import React, { useState, useContext, useEffect, Component, createRef } from "react";

import { Context } from "../../store/appContext";
//importar librería slick
import Slider from "react-slick";

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

	// //Slider libreria Slick button-next
	// function SampleNextArrow(props) {
	// 	const { className, style, onClick } = props;
	// 	return (
	// 		<div className={className} style={{ ...style, display: "block", background: "red" }} onClick={onClick} />
	// 	);
	// }

	// //Slider libreria Slick button-prev
	// function SamplePrevArrow(props) {
	// 	const { className, style, onClick } = props;
	// 	return (
	// 		<div className={className} style={{ ...style, display: "block", background: "green" }} onClick={onClick} />
	// 	);
	// }

	//creating the ref
	const customeSlider = createRef();

	const gotoNext = () => {
		customeSlider.current.slickNext();
	};

	const gotoPrev = () => {
		customeSlider.current.slickPrev();
	};

	//slick settings
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 2,
		arrows: true
		// nextArrow: () => (
		// 	<div
		// 		style={{
		// 			backgroundColor: "#ddd",
		// 			padding: "5px",
		// 			display: "flex"
		// 		}}
		// 	/>
		// )
	};

	return (
		<div className="carousel-container col-10 m-auto">
			<div className>{images ? "" : ""}</div>
			<button onClick={() => gotoNext()}>Next</button>
			<button onClick={() => gotoPrev()}>Previous</button>
			{images ? (
				<Slider {...settings} style={{ clear: "both" }} ref={customeSlider}>
					{images.map(image => {
						return (
							<div className="carousel-item" key={image}>
								<img src={image.url_image} alt="Image" />
							</div>
						);
					})}
				</Slider>
			) : (
				""
			)}
		</div>
	);
}
