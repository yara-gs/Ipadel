import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useHistory } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import "../../../styles/center.scss";
import "../../../styles/imgcarousel.scss";

export default function CarouselImages() {
	const { actions, store } = useContext(Context);

	const [message, setMessage] = useState(" ");
	const [imagesCarousel, setImagesCarousel] = useState([]);
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

	// if (images != null) {
	// 	let arraySize = images.length;
	// 	const imagesperItem = 4;
	// 	let itemsNumber = arraySize / imagesperItem;
	// 	for (let i = 0; i < itemsNumber; i++) {
	// 		console.log("Item:" + itemsNumber);
	// 		for (let item = 0; i < imagesperItem; item++) {
	// 			let itemoffset = 4 * i + item;

	// 			console.log(itemoffset);
	// 		}
	// 	}
	// }

	function getImages() {
		//GET COURTS OF A SPORT CENTER
		fetch(process.env.BACKEND_URL + "/api/" + sportCenter.id + "/images", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(resultJson => setImages(resultJson));
	}

	return (
		<div className=" carouselImages">
			<div>
				{sportCenter ? (
					<Carousel className=" d-flex">
						<Carousel.Item>
							<div className="row ">
								<div className="col-xs-2">
									<img
										src="http://ipadel.s3.amazonaws.com/centerImage_02.jpg"
										alt="Image"
										className="img-responsive"
									/>
								</div>
								<div className="col-xs-2">
									<img
										src="http://ipadel.s3.amazonaws.com/centerImage_01.jpg"
										alt="Image"
										className="img-responsive"
									/>
								</div>
								<div className="col-xs-2">
									<img
										src="http://ipadel.s3.amazonaws.com/centerImage_03.jpg"
										alt="Image"
										className="img-responsive"
									/>
								</div>
								<div className="col-xs-2">
									<img
										src="http://ipadel.s3.amazonaws.com/centerImage_04.jpg"
										alt="Image"
										className="img-responsive"
									/>
								</div>
							</div>
							<Carousel.Caption>
								<h3>First slide label</h3>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<div className="row">
								<div className="col-xs-2">
									<a href="#x">
										<img
											src="http://ipadel.s3.amazonaws.com/centerImage_01.jpg"
											alt="Image"
											className="img-responsive"
										/>
									</a>
								</div>
								<div className="col-xs-2">
									<a href="#x">
										<img
											src="http://ipadel.s3.amazonaws.com/centerImage_01.jpg"
											alt="Image"
											className="img-responsive"
										/>
									</a>
								</div>
								<div className="col-xs-2">
									<a href="#x">
										<img
											src="http://ipadel.s3.amazonaws.com/centerImage_01.jpg"
											alt="Image"
											className="img-responsive"
										/>
									</a>
								</div>
								<div className="col-xs-2">
									<a href="#x">
										<img
											src="http://ipadel.s3.amazonaws.com/centerImage_01.jpg"
											alt="Image"
											className="img-responsive"
										/>
									</a>
								</div>
							</div>
							<Carousel.Caption>
								<h3>Second slide label</h3>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				) : (
					""
				)}
			</div>

			<div className="container my-4">
				<div id="multi-item-example" className="carousel slide carousel-multi-item" data-ride="carousel" />
			</div>
		</div>
	);
}

{
	/* <div className="d-flex justify-content-center ">
				<div className="container">
					<h1 className="h1carousel">Imagenes</h1>
					<div className="row">
						<div className="col-md-12">
							<div className="carousel slide multi-item-carousel" id="theCarousel">
								<div className="carousel-inner">
									<div className="item active">
										<div className="col-xs-4">
											<a href="#1">
												<img
													src="https://source.unsplash.com/300x300/?perth,australia"
													className="img-responsive"
												/>
											</a>
										</div>
									</div>
									<div className="item">
										<div className="col-xs-4">
											<a href="#1">
												<img
													src="https://source.unsplash.com/300x300/?fremantle,australia"
													className="img-responsive"
												/>
											</a>
										</div>
									</div>
									<div className="item">
										<div className="col-xs-4">
											<a href="#1">
												<img
													src="https://source.unsplash.com/300x300/?west-australia"
													className="img-responsive"
												/>
											</a>
										</div>
									</div>
									<div className="item">
										<div className="col-xs-4">
											<a href="#1">
												<img
													src="https://source.unsplash.com/300x300/?perth"
													className="img-responsive"
												/>
											</a>
										</div>
									</div>
									<div className="item">
										<div className="col-xs-4">
											<a href="#1">
												<img
													src="https://source.unsplash.com/300x300/?quokka,perth"
													className="img-responsive"
												/>
											</a>
										</div>
									</div>
									<div className="item">
										<div className="col-xs-4">
											<a href="#1">
												<img
													src="https://source.unsplash.com/300x300/?margaretriver,australia"
													className="img-responsive"
												/>
											</a>
										</div>
									</div> */
}
{
	/* <!-- add  more items here -->
          <!-- Example item start:  --> */
}
{
	/* 
									<div className="item">
										<div className="col-xs-4">
											<a href="#1">
												<img
													src="https://source.unsplash.com/300x300/?perth,australia&r=7"
													className="img-responsive"
												/>
											</a>
										</div>
									</div> */
}

{
	/* <!--  Example item end --> */
}
{
	/* </div>
								<a className="left carousel-control" href="#theCarousel" data-slide="prev">
									<i className="glyphicon glyphicon-chevron-left" />
								</a>
								<a className="right carousel-control" href="#theCarousel" data-slide="next">
									<i className="glyphicon glyphicon-chevron-right" />
								</a>
							</div>
						</div>
					</div>
				</div> */
}

{
	/* <div className="card courtcard text-dark bg-light">
					<div className="card-header d-flex justify-content-between">Arrastra las fotos de tu centro</div>
					<div className="card-body">
						<div className="card-title">Archivos</div>
					</div>
				</div> */
}
