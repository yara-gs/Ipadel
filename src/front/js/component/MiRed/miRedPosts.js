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
				{postsList ? <p>{props.post}</p> : ""}
				<div className="w3-row-padding" id="container2">
					{postsList ? (
						<div className="w3-border w3-padding w3-image">
							<img
								src={props.url_image}
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
					onClick={() => createComment(props.id, comment)}
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
	url_image: PropTypes.string,
	post: PropTypes.string,
	id: PropTypes.number
};
