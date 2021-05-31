import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";
import MiRedComments from "./miRedComments";
import "w3-css/w3.css";

export default function MiRedPosts(props) {
	const [commentsList, setCommentsList] = useState(props.post.comments);
	const [comment, setComment] = useState("");

	//variables likes
	const [likes, setLikes] = useState(null);

	const { actions, store } = useContext(Context);
	let user = actions.getUser();
	//tiempo desde que se realizo el post
	let today = new Date();
	let today_string = today.toISOString().slice(0, 10);
	let postdate = new Date(props.post.datetime);
	let postTime = "";
	let dif_min = (today - postdate) / 60000;

	if (commentsList != props.post.comments) {
		setCommentsList(props.post.comments);
	}

	//CREATE COMMENT OF A POST
	function createComment(post_id, commentText) {
		let body_comment = {
			user_id: user.id,
			post_id: post_id,
			text: commentText
		};

		fetch(process.env.BACKEND_URL + "/api/comment", {
			method: "POST",
			body: JSON.stringify(body_comment),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				props.createComment(body_comment, post_id);
				let arrayCopy = [...commentsList, body_comment];
				setCommentsList(arrayCopy);
				setComment("");
			});
	}

	//LIKES
	//GET ALL LIKES by user_id
	// useEffect(() => {
	// 	if (user !== null) {
	// 		fetch(process.env.BACKEND_URL + "/api/comments/" + user.id, {
	// 			method: "GET",
	// 			headers: { "Content-Type": "application/json" }
	// 		})
	// 			.then(response => response.json())
	// 			.then(resultJson => {
	// 				setCommentsList(resultJson);
	// 			});
	// 	}
	// }, []);

	// TIEMPO QUE LLEVA EL POST ACTIVO

	dif_min = Math.round(dif_min);
	if (dif_min <= 59) {
		postTime = dif_min + " min";
	} else if ((dif_min >= 60) & (dif_min < 1440)) {
		postTime = Math.round(dif_min / 60) + " h";
	} else if ((dif_min >= 1440) & (dif_min < 525600)) {
		postTime = Math.round(dif_min / 1440) + " días";
	}
	return (
		<div className="w3-col">
			<div className="w3-container w3-card w3-white w3-round w3-margin">
				<br />
				<div
					className="user-image w3-left w3-circle w3-margin-right"
					style={{
						backgroundImage: `url(${props.post.user_url_image})`,
						width: "60px",
						height: "60px"
					}}
				/>
				<span className="w3-right w3-opacity">{postTime}</span>
				{user ? <h4>{props.post.username}</h4> : ""}
				<br />
				<hr className="w3-clear" />
				<p>{props.post.text}</p>
				<div className="w3-row-padding" id="container2">
					<div className="w3-border w3-padding w3-image">
						<img
							src={props.post.url_image}
							id="image8"
							alt="Northern Lights"
							className="w3-margin-bottom imagePosts w3-hover-grayscale"
						/>
					</div>

					<br />
					<input
						className="w3-border w3-padding w3-col m12"
						placeholder="Comment Here!"
						value={comment}
						type="text"
						onChange={event => {
							setComment(event.target.value);
						}}
					/>
				</div>
				<button type="button" className="w3-button w3-theme-d1 w3-margin-bottom">
					<i className="fa fa-thumbs-up" />  Like
				</button>

				<button
					type="button"
					onClick={() => createComment(props.post.id, comment)}
					className="w3-button w3-theme-d2 w3-margin-bottom">
					<i className="fa fa-comment" />  Comment
				</button>

				{commentsList.map(comment => {
					return <MiRedComments key={comment.id} comment={comment} />;
				})}
			</div>
		</div>
	);
}

MiRedPosts.propTypes = {
	post: PropTypes.object,
	createComment: PropTypes.func
};
