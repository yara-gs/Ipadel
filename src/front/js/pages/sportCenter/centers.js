import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import CarouselImages from "../../component/sportCenter/carouselImages.jsx";

export default function Centers() {
	const { actions, store } = useContext(Context);
	const [sportCenter, setSportCenter] = useState(actions.getSportCenter());
	const [images, setImages] = useState(null);
	// /* <script>
	// Get the Sidebar
	var mySidebar = document.getElementById("mySidebar");

	// Get the DIV with overlay effect
	var overlayBg = document.getElementById("myOverlay");

	// Toggle between showing and hiding the sidebar, and add overlay effect
	function w3_open() {
		if (mySidebar.style.display === "block") {
			mySidebar.style.display = "none";
			overlayBg.style.display = "none";
		} else {
			mySidebar.style.display = "block";
			overlayBg.style.display = "block";
		}
	}

	// Close the sidebar with the close button
	function w3_close() {
		mySidebar.style.display = "none";
		overlayBg.style.display = "none";
	}
	// </script> */

	useEffect(
		() => {
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
			.then(resultJson => {
				setImages(resultJson);
			});
	}

	return (
		<div>
			{/* <!-- Sidebar/menu --> */}
			<nav className="w3-sidebar w3-collapse w3-white w3-animate-left" id="mySidebar">
				<br />
				<div className="w3-container w3-row">
					<div className="w3-col s4">
						<img
							src="https://www.w3schools.com/w3images/avatar3.png"
							className="w3-circle w3-margin-right"
							style={{ width: "46px" }}
						/>
					</div>
					<div className="w3-col s8 w3-bar">
						<span>
							Welcome, <strong>Mike</strong>
						</span>
						<br />
						<a href="#" className="w3-bar-item w3-button">
							<i className="fa fa-envelope" />
						</a>
						<a href="#" className="w3-bar-item w3-button">
							<i className="fa fa-user" />
						</a>
						<a href="#" className="w3-bar-item w3-button">
							<i className="fa fa-cog" />
						</a>
					</div>
				</div>
				<hr />
				<div className="w3-container">
					<h5>Dashboard</h5>
				</div>
				<div className="w3-bar-block">
					<a
						href="#"
						className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black"
						onClick="w3_close()"
						title="close menu">
						<i className="fa fa-remove fa-fw" />
						  Close Menu
					</a>
					<a href="#" className="w3-bar-item w3-button w3-padding w3-blue">
						<i className="fa fa-users fa-fw" />
						  Overview
					</a>
					<a href="#" className="w3-bar-item w3-button w3-padding">
						<i className="fa fa-eye fa-fw" />
						  Views
					</a>
					<a href="#" className="w3-bar-item w3-button w3-padding">
						<i className="fa fa-users fa-fw" />
						  Traffic
					</a>
					<a href="#" className="w3-bar-item w3-button w3-padding">
						<i className="fa fa-bullseye fa-fw" />
						  Geo
					</a>
					<a href="#" className="w3-bar-item w3-button w3-padding">
						<i className="fa fa-diamond fa-fw" />
						  Orders
					</a>
					<a href="#" className="w3-bar-item w3-button w3-padding">
						<i className="fa fa-bell fa-fw" />
						  News
					</a>
					<a href="#" className="w3-bar-item w3-button w3-padding">
						<i className="fa fa-bank fa-fw" />
						  General
					</a>
					<a href="#" className="w3-bar-item w3-button w3-padding">
						<i className="fa fa-history fa-fw" />
						  History
					</a>
					<a href="#" className="w3-bar-item w3-button w3-padding">
						<i className="fa fa-cog fa-fw" />
						  Settings
					</a>
					<br />
					<br />
				</div>
			</nav>

			{/* <!-- Overlay effect when opening sidebar on small screens --> */}
			<div
				className="w3-overlay w3-hide-large w3-animate-opacity"
				onClick="w3_close()"
				style={{ cursor: "pointer" }}
				title="close side menu"
				id="myOverlay"
			/>

			{/* <!-- !PAGE CONTENT! --> */}
			<div className="w3-main">
				{/* <!-- Header --> */}
				<header className="w3-container">
					<h5>
						<b>
							<i className="fa fa-dashboard" /> Centros deportivos
						</b>
					</h5>
				</header>

				<div className="w3-panel">
					<div className="w3-row-padding">
						<div className="w3-twothird">
							<table className="w3-table w3-striped w3-white w3-card-4  ">
								<tr>
									<td className="first-column">
										<i className="fas fa-baseball-ball w3-text-amber  " />
										Centro
									</td>
									<td>Burpadel</td>
									<td>
										<button className="fas fa-pen center-edit-btn" />
									</td>
								</tr>

								<tr>
									<td className="first-column">
										<i className="far fa-file w3-text-gray " />
										NIF
									</td>
									<td>754125daf7e1</td>
									<td>
										<button className="fas fa-pen center-edit-btn" />
									</td>
								</tr>
								<tr>
									<td className="first-column">
										<i className="fas fa-map-marker-alt w3-text-red w3-large" />
										Dirección
									</td>
									<td>C/ Lopez Bravo, 2 09001 Burgos</td>
									<td>
										<button className="fas fa-pen center-edit-btn" />
									</td>
								</tr>
								<tr>
									<td className="first-column">
										<i className="fas fa-phone w3-text-grey w3-large" />
										Tlf
									</td>
									<td>61789562</td>
									<td>
										<button className="fas fa-pen center-edit-btn" />
									</td>
								</tr>
								<tr>
									<td className="first-column">
										<i className="fas fa-globe w3-text-blue w3-large" />
										Web
									</td>
									<td>www.beup.com</td>
									<td>
										<button className="fas fa-pen center-edit-btn" />
									</td>
								</tr>
								<tr>
									<td className="first-column">
										<i className="fas fa-list-ol w3-text-teal w3-large" />
										Nº Pistas
									</td>
									<td>25</td>
									<td>
										<button className="fas fa-pen center-edit-btn" />
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
