import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/mired.scss";
import "w3-css/w3.css";
import MiRedPerfil from "../component/MiRed/miRedPerfil";
import MiRedInterests from "../component/MiRed/miRedInterests";
import MiRedPostText from "../component/MiRed/miRedPostText";
import MiRedPosts from "../component/MiRed/miRedPosts";
import MiRedEvents from "../component/MiRed/miRedEvents";
import MiRedFriendRequest from "../component/MiRed/miRedFriendRequest";

export default function MiRedComponentes() {
	const { actions } = useContext(Context);
	const history = useHistory();

	const [postsList, setPostsList] = useState([]);
	const [post, setPost] = React.useState("");
	const [message, setMessage] = useState("");
	const [image, setImage] = React.useState("");

	let user = actions.getUser();
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		let acessToken = actions.getAccessToken();
		if (!acessToken) {
			history.push("/login");
			return;
		}
		fetch(process.env.BACKEND_URL + "/api/getuser", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				let user_with_image = responseJson;
				user_with_image.url_image = "";
				actions.saveUser(user_with_image);
			});
	}, []);

	useEffect(() => {
		if (user) {
			fetch(process.env.BACKEND_URL + "/api/profile/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => setProfile(resultJson));
		}
	}, [user]);

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

	function createPost() {
		const formData = new FormData();
		formData.append("user_id", user.id);
		formData.append("image", image[0]);
		formData.append("text", post);
		let responseOk = false;
		console.log(formData);

		setMessage("");
		fetch(process.env.BACKEND_URL + "/api/post", {
			method: "POST",
			body: formData
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				let newPost = [responseJson, ...postsList];
				// newPost.push(responseJson);
				setPostsList(newPost);

				responseOk = response.ok;
				if (response.ok) {
					setMessage("Imagenes importadas correctamente");
				} else {
					setMessage("Fallo al importar imagenes");
				}
			})
			.catch(error => {
				setMessage("Fallo al importar imagenes");
			});

		//COMMENTS
		//GET ALL COMMENTS+LIKES by user_id
	}

	return (
		<div className="w3-margin-top">
			<div className="w3-col m3">
				<MiRedPerfil />
				<MiRedInterests />
			</div>

			<div className="w3-col m7">
				<div className="w3-col">
					<div className="w3-row-padding">
						<div className="w3-col m12">
							<div className="w3-card w3-round w3-white">
								<div className="w3-container w3-padding">
									<h6 className="w3-opacity">Comparte con tus amigos tu pasion por el padel!</h6>
									<input
										className="w3-border w3-padding w3-col m12"
										value={post}
										type="text"
										onChange={event => {
											setPost(event.target.value);
										}}
									/>
									<p />
									<div>
										<input type="file" onChange={event => setImage(event.currentTarget.files)} />
										<p />
										<button onClick={() => createPost()} className=" w3-btn w3-green">
											Post
										</button>
										{/* <button onClick={() => deletePost(1)}>Delete Post</button> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{postsList.map((post, index) => {
					return <MiRedPosts key={index} post={post.text} url_image={post.url_image} id={post.id} />;
				})}
			</div>
			<div className="w3-col m2">
				<MiRedEvents />
				<MiRedFriendRequest />
			</div>
		</div>
	);
}
