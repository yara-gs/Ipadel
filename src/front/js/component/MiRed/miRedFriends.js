import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

import "../../../styles/mired.scss";
import "w3-css/w3.css";

import MiRedFriend from "./miRedFriend";

export default function MiRedFriends(props) {
	const [friends, setFriends] = useState(props.friends);

	return (
		<div className="w3-col w3-margin-top">
			<div className="w3-card w3-round w3-white w3-hide-small">
				<div className="w3-container ">
					<p>Amigos</p>
					<div className=" d-flex justify-content-start">
						{props.friends !== null ? (
							<div className=" d-flex ">
								{props.friends.map(friend => {
									return <MiRedFriend key={friend.id} friend={friend} />;
								})}
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

MiRedFriends.propTypes = {
	friends: PropTypes.array
};
