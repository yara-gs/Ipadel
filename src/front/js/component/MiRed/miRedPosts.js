import React, { useState, useContext, useEffect } from "react";

import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedPosts() {
	const [posts, setPosts] = useState(null);
	const [postText, setPostText] = useState("Mi post");

	const { actions, store } = useContext(Context);
	let user = actions.getUser();

	useEffect(() => {
		if (user !== null) {
			fetch(process.env.BACKEND_URL + "/api/posts/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setPosts(resultJson);
				});
		}
	}, []);

	return (
		<div className="w3-col">
			<div className="w3-container w3-card w3-white w3-round w3-margin">
				<br />
				<img
					src="https://www.w3schools.com/w3images/avatar2.png"
					alt="Avatar"
					className="w3-left w3-circle w3-margin-right"
					id="image7"
				/>
				<span className="w3-right w3-opacity">1 min</span>
				{user ? <h4>{user.username}</h4> : ""}
				<br />
				<hr className="w3-clear" />
				{posts ? <p>{posts.text}</p> : ""}
				<div className="w3-row-padding" id="container2">
					{posts ? (
						<div className="w3-half">
							<img src={posts.url_image} id="image8" alt="Northern Lights" className="w3-margin-bottom" />
						</div>
					) : (
						""
					)}
					<div className="w3-half">
						<img
							src="https://www.w3schools.com/w3images/nature.jpg"
							id="image9"
							alt="Nature"
							className="w3-margin-bottom"
						/>
					</div>
				</div>
				<button type="button" className="w3-button w3-theme-d1 w3-margin-bottom">
					<i className="fa fa-thumbs-up" />  Like
				</button>
				<button type="button" className="w3-button w3-theme-d2 w3-margin-bottom">
					<i className="fa fa-comment" />  Comment
				</button>
			</div>
		</div>
	);
}
