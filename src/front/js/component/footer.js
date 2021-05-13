import React, { Component } from "react";

export default function Footer() {
	return (
		<footer className="w3-center w3-black w3-padding-64">
			<a href="#home" className="w3-button w3-light-grey">
				<i className="fa fa-arrow-up w3-margin-right" />
				To the top
			</a>
			<div className="w3-xlarge w3-section">
				<i className="fa fa-facebook-official w3-hover-opacity" />
				<i className="fa fa-instagram w3-hover-opacity" />
				<i className="fa fa-snapchat w3-hover-opacity" />
				<i className="fa fa-pinterest-p w3-hover-opacity" />
				<i className="fa fa-twitter w3-hover-opacity" />
				<i className="fa fa-linkedin w3-hover-opacity" />
			</div>
			<p>
				Powered by{" "}
				<span>
					<i className="fas fa-baseball-ball fa-s" />
					<span> iPadel</span>
				</span>
			</p>
		</footer>
	);
}
