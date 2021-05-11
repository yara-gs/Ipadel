// import React, { useContext, useState, useEffect } from "react";
// import { Context } from "../../store/appContext";
// import "../../../styles/mired.scss";
// import "w3-css/w3.css";
// import "../../../styles/buttons.scss";

// export default function MiRedPostText() {
// 	const { actions, store } = useContext(Context);
// 	let user = actions.getUser();

// 	const [message, setMessage] = useState("");
// 	const [image, setImage] = React.useState("");
// 	const [postsList, setPostsList] = React.useState([]);

// 	const [post, setPost] = React.useState("");
// 	// const [liNewTask, setLiNewTask] = React.useState([]);

// 	// function uploadImages() {
// 	// 	const formData = new FormData();
// 	// 	setImporting(true);
// 	// 	formData.append("sportcenter_id", sportCenterId);
// 	// 	for (let i = 0; i < centerImages.length; i++) {
// 	// 		let data = "image_" + i;
// 	// 		formData.append(data, centerImages[i]);
// 	// 	}

// 	// 	setMessage("");
// 	// 	setError("");
// 	// 	let responseOk = false;

// 	// 	fetch(process.env.BACKEND_URL + "/api/upload-images", {
// 	// 		method: "POST",
// 	// 		body: formData
// 	// 	})
// 	// 		.then(response => response.json())
// 	// 		.then(resultJson => {
// 	// 			props.importedImages(resultJson);
// 	// 			setMessage("Imagenes importadas correctamente");
// 	// 			setImporting(false);
// 	// 		})

// 	// 		.catch(error => {
// 	// 			setError(error.message);
// 	// 			setImporting(false);
// 	// 			setMessage("Fallo al importar imagenes");
// 	// 		});
// 	// }

// 	function createPost() {
// 		const formData = new FormData();
// 		formData.append("user_id", user.id);
// 		formData.append("image", image[0]);
// 		formData.append("text", post);
// 		let responseOk = false;
// 		console.log(formData);

// 		setMessage("");
// 		fetch(process.env.BACKEND_URL + "/api/post", {
// 			method: "POST",
// 			body: formData
// 		})
// 			.then(response => {
// 				responseOk = response.ok;
// 				if (response.ok) {
// 					setMessage("Imagenes importadas correctamente");
// 				} else {
// 					setMessage("Fallo al importar imagenes");
// 				}
// 			})
// 			.catch(error => {
// 				setMessage("Fallo al importar imagenes");
// 			});
// 	}

// 	//POST
// 	//DELETE POST

// 	function deletePost(post_id) {
// 		fetch(process.env.BACKEND_URL + "/api/postdelete/" + post_id, {
// 			method: "GET",
// 			headers: { "Content-Type": "application/json" }
// 		})
// 			.then(response => response.json())
// 			.then(resultJson => {
// 				let arrayCopy = [...posts];
// 				let arrayPos = arrayCopy.findIndex(item => item.id === post_id);
// 				arrayCopy.splice(arrayPos, 1);
// 				setPosts(arrayCopy);
// 			});
// 	}

// 	// function addPost() {
// 	// 	//	let newList = tasksList.push(task);
// 	// 	let newList = [post, ...postsList];

// 	// 	setPostsList(newList);
// 	// 	console.log(postsList.indexOf(post));
// 	// 	setPost("");
// 	// }

// 	function deletePost(postsListIndex) {
// 		const newList = postsList.filter((_, index) => index !== postsListIndex);

// 		setPostsList(newList);
// 	}
// 	var d = new Date();
// 	var hour = d.getHours();

// 	// useEffect(() => {
// 	const liNewTask = postsList.map((eachPost, index) => {
// 		return (
// 			<div className="w3-container w3-card w3-white w3-round w3-margin" key={index}>
// 				<br />
// 				<img
// 					src="https://www.w3schools.com/w3images/avatar2.png"
// 					alt="Avatar"
// 					className="w3-left w3-circle w3-margin-right"
// 					id="image7"
// 				/>
// 				<span className="w3-right w3-opacity">{hour + ".00"}</span>
// 				{user ? <h4>{user.username}</h4> : ""}
// 				<br />
// 				<hr className="w3-clear" />
// 				<p>{eachPost.text}</p>
// 				<div className="w3-row-padding" id="container2">
// 					<div className="w3-half">
// 						<img
// 							src="https://www.w3schools.com/w3images/lights.jpg"
// 							id="image8"
// 							alt="Northern Lights"
// 							className="w3-margin-bottom"
// 						/>
// 					</div>
// 					<div className="w3-half">
// 						<img
// 							src="https://www.w3schools.com/w3images/nature.jpg"
// 							id="image9"
// 							alt="Nature"
// 							className="w3-margin-bottom"
// 						/>
// 					</div>
// 				</div>
// 				<button type="button" className="w3-button w3-theme-d1 w3-margin-bottom">
// 					<i className="fa fa-thumbs-up" />  Me Gusta
// 				</button>
// 				<button type="button" className="w3-button w3-theme-d2 w3-margin-bottom">
// 					<i className="fa fa-comment" />  Comment
// 				</button>
// 			</div>
// 		);
// 	});
// 	// }, []);
// 	return (
// 		<div className="w3-col">
// 			<div className="w3-row-padding">
// 				<div className="w3-col m12">
// 					<div className="w3-card w3-round w3-white">
// 						<div className="w3-container w3-padding">
// 							<h6 className="w3-opacity">Comparte con tus amigos tu pasion por el padel!</h6>
// 							<input
// 								className="w3-border w3-padding w3-col m12"
// 								value={post}
// 								type="text"
// 								onChange={event => {
// 									setPost(event.target.value);
// 								}}
// 							/>
// 							<p />
// 							<div>
// 								<input type="file" onChange={event => setImage(event.currentTarget.files)} />
// 								<p />
// 								<button onClick={() => createPost()} className=" w3-btn w3-green">
// 									Post
// 								</button>
// 								{/* <button onClick={() => deletePost(1)}>Delete Post</button> */}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			{liNewTask}
// 		</div>
// 	);
// }
