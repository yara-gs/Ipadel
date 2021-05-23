import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";
import MiRedComments from "./miRedComments";
import "w3-css/w3.css";

export default function MiRedPosts(props) {
	const [postsList, setPostsList] = useState([]);
	const [postText, setPostText] = useState("Mi post");

	const [image, setImage] = React.useState("");

	const [message, setMessage] = useState("");
	const [commentsList, setCommentsList] = useState([]);
	const [comment, setComment] = useState("");
	const [commentText, setCommentText] = useState("");

	//variables likes
	const [likes, setLikes] = useState(null);

	const { actions, store } = useContext(Context);
	let user = actions.getUser();
	//tiempo desde que se realizo el post
	let today = new Date();
	let today_string = today.toISOString().slice(0, 10);
	let postdate = new Date(props.post.datetime);
	let dateCorrect = true;
	let postTime = "";
	let dif_min = (today - postdate) / 60000;

	useEffect(() => {
		if (user !== null) {
			fetch(process.env.BACKEND_URL + "/api/posts/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setPostsList(resultJson);
				});
		}
	}, []);

	//COMMENTS
	//GET ALL COMMENTS+LIKES by user_id
	useEffect(() => {
		if (user && comment !== null) {
			fetch(process.env.BACKEND_URL + "/api/comments/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setCommentsList(resultJson);
				});

			fetch(process.env.BACKEND_URL + "/api/likes/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setLikes(resultJson);
					setLikes("");
				});
		}
	}, []);

	//CREATE COMMENT OF A POST
	function createComment(post_id, commentText) {
		let body_comment = {
			user_id: user.id,
			post_id: post_id,
			text: commentText
		};

		setMessage("");
		fetch(process.env.BACKEND_URL + "/api/comment", {
			method: "POST",
			body: JSON.stringify(body_comment),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				let arrayCopy = [...commentsList, responseJson];
				setCommentsList(arrayCopy);
			});
	}

	//COMMENT
	//DELETE COMMENT

	function deleteComment(comment_id) {
		fetch(process.env.BACKEND_URL + "/api/commentdelete/" + comment_id, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(resultJson => {
				let arrayCopy = [...commentsList];
				let arrayPos = arrayCopy.findIndex(item => item.id === comment_id);
				arrayCopy.splice(arrayPos, 1);
				setCommentsList(arrayCopy);
			});
	}

	//LIKES
	//GET ALL LIKES by user_id
	useEffect(() => {
		if (user !== null) {
			fetch(process.env.BACKEND_URL + "/api/comments/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setCommentsList(resultJson);
				});
		}
	}, []);

	//Tiempo desde que se realizo el Post

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
				{postsList ? <p>{props.post.text}</p> : ""}
				<div className="w3-row-padding" id="container2">
					{postsList ? (
						<div className="w3-border w3-padding w3-image">
							<img
								src={props.post.url_image}
								id="image8"
								alt="Northern Lights"
								className="w3-margin-bottom imagePosts w3-hover-grayscale"
							/>
						</div>
					) : (
						""
					)}
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
				{commentsList.map((comment, index) => {
					<MiRedComments key={index} comments={comment.text} />;
				})}
			</div>
		</div>
	);
}

MiRedPosts.propTypes = {
	post: PropTypes.object
};
