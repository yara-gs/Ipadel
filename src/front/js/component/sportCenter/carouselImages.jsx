import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

//importar librería slick
import Slider from "react-slick";

import "../../../styles/center.scss";
import "../../../styles/imgcarousel.scss";

export default function CarouselImages(props) {
	const { actions, store } = useContext(Context);

	let slidesToShow = 5;
	if (props.images.length < 5) {
		slidesToShow = props.images.length;
	}

	//slick settings
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: slidesToShow,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000
		// className: "center",
		// centerMode: true,
		// centerPadding: "60px"
	};

	return (
		<div className="carousel-container col-10 m-auto justify-content-center ">
			<div className=" court-icon sporCenterImages next_step " />
			<Slider {...settings}>
				{props.images.map(image => {
					return (
						<div key={image} className="carousel-item">
							<div className="carousel-img" style={{ backgroundImage: `url(${image.url_image})` }} />
						</div>
					);
				})}
			</Slider>
		</div>
	);
}

CarouselImages.propTypes = {
	images: PropTypes.object
};
