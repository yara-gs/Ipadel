import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

//importar librería slick
import Slider from "react-slick";

import "../../../styles/center.scss";
import "../../../styles/imgcarousel.scss";

export default function CarouselImages(props) {
	const { actions, store } = useContext(Context);

	let className_item = "";
	let className_carousel = "";

	let slidesToShow = props.slidesToShow;
	if (props.images) {
		if (props.images.length < 5) {
			slidesToShow = props.images.length;
		}
	}

	if (slidesToShow === 1) {
		className_item = "carousel-item-individual";
		className_carousel = "carousel-container col-10 m-auto justify-content-center ";
	} else {
		className_item = "carousel-item";
		className_carousel = "carousel-container col-10 m-auto justify-content-center slickbtn ";
	}

	//slick settings
	const settings = {
		dots: props.dots,
		infinite: true,
		speed: 500,
		slidesToShow: slidesToShow,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000
		// className: "center",
		// centerMode: true,
		// centerPadding: "60px"
	};

	return (
		<div className={className_carousel}>
			{props.images ? (
				<Slider {...settings}>
					{props.images.map(image => {
						return (
							<div key={image} className={className_item}>
								<div className="carousel-img" style={{ backgroundImage: `url(${image.url_image})` }} />
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

CarouselImages.propTypes = {
	images: PropTypes.object,
	slidesToShow: PropTypes.number,
	dots: PropTypes.boolean
};
