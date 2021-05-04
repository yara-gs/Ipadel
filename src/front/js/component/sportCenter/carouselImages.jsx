import React, { useState, useContext, useEffect } from "react";

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

	let slidesToShow = 5;
	if (images) {
		if (images.length < 5) {
			slidesToShow = images.length;
		}
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
			<div className>{images ? "" : ""}</div>
			{images ? (
				<span>
					<div className=" court-icon sporCenterImages next_step " />
					<Slider {...settings}>
						{images.map(image => {
							return (
								<div key={image} className="carousel-item">
									<div
										className="carousel-img"
										style={{ backgroundImage: `url(${image.url_image})` }}
									/>
								</div>
							);
						})}
					</Slider>
				</span>
			) : (
				""
			)}
		</div>
	);
}
