import React, { useState, useContext, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import "../../styles/mired.scss";
import "w3-css/w3.css";
import { UncontrolledTooltip } from "reactstrap";
import MiRedPerfil from "../component/MiRed/miRedPerfil";
import MiRedInterests from "../component/MiRed/miRedInterests";
import MiRedPostText from "../component/MiRed/miRedPostText";
import MiRedPosts from "../component/MiRed/miRedPosts";
import MiRedEvents from "../component/MiRed/miRedEvents";
import MiRedFriendRequest from "../component/MiRed/miRedFriendRequest";

export default function MiRedComponentes() {
	const { actions } = useContext(Context);
	const history = useHistory();
	const fileInput = useRef(null);

	const [postsList, setPostsList] = useState([]);
	const [post, setPost] = useState("");
	const [message, setMessage] = useState("");
	const [image, setImage] = useState("");
	const [friends, setFriends] = useState(null);
	const [users, setUsers] = useState(null);

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
				actions.saveUser(responseJson);
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
		if (user) {
			fetch(process.env.BACKEND_URL + "/api/users/", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setUsers(resultJson);
				});
			fetch(process.env.BACKEND_URL + "/api/posts/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setPostsList(resultJson);
				});

			fetch(process.env.BACKEND_URL + "/api/friends/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setFriends(resultJson);
				});
		}
	}, []);

	function createPost() {
		const formData = new FormData();
		formData.append("user_id", user.id);
		formData.append("image", image[0]);
		formData.append("text", post);
		let responseOk = false;

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
				setPostsList(newPost);

				responseOk = response.ok;
				if (response.ok) {
					setMessage("Imagenes importadas correctamente");
					setPost("");
					setImage("");
				} else {
					setMessage("Fallo al importar imagenes");
					setPost("");
					setImage("");
				}
			})
			.catch(error => {
				setMessage("Fallo al importar imagenes");
				setPost("");
				setImage("");
			});

		//COMMENTS
		//GET ALL COMMENTS+LIKES by user_id
	}
	const onBtnClick = () => {
		/*Collecting node-element and performing click*/
		fileInput.current.click();
	};

	return (
		<div className="body-mired ">
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
										<div className=" w3-col m12 d-flex justify-content-between">
											<div className="upload-img">
												<input
													type="file"
													name="image"
													ref={fileInput}
													onChange={event => setImage(event.currentTarget.files)}
													style={{ display: "none" }}
												/>

												<button
													type="button"
													className=" far fa-images"
													id="Tooltip_addbtn"
													onClick={onBtnClick}
												/>
												{image !== "" ? <span className="text_xs">{image[0].name}</span> : ""}
												<UncontrolledTooltip placement="bottom" target="Tooltip_addbtn">
													Subir Imagen
												</UncontrolledTooltip>
											</div>
											<div className="post-btn">
												<button
													onClick={() => createPost()}
													className="w3-btn w3-green"
													style={{ width: "60px" }}>
													Post
												</button>
											</div>
										</div>

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
