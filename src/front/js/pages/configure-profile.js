import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Button } from "bootstrap";
import MiRedPostText from "../component/MiRed/miRedPostText";

export default function ConfigureProfile() {
	const [todos, setTodos] = useState([]);
	const [newTodo, SetNewTodo] = useState("");

	const { actions, store } = useContext(Context);
	let user = actions.getUser();


	const [birth, setBirth] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");

	const [gender, setGender] = useState("Mujer");
	const [image, setImage] = useState("");
	//variables Post
	const [posts, setPosts] = useState(null);
	const [postText, setPostText] = useState("Mi post");

	//variables Comments
	const [comments, setComments] = useState(null);
	const [commentText, setCommentText] = useState("Mi primer comentario");

	//variables likes
	const [likes, setLikes] = useState(null);

	//PROFILE
	//GET PROFILE
	if (user !== null) {
		useEffect(() => {
			fetch(process.env.BACKEND_URL + "/api/profile/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => setProfile(resultJson));
		}, []);
	}

	//PROFILE
	//SAVE NEW PROFILE
	function createProfile() {
		let body_profile = {
			user_id: user.id,
			birth: birth,
			city: city,
			country: country
			// gender: gender
		};
		setMessage("");
		fetch(process.env.BACKEND_URL + "/api/profile/", {
			method: "POST",
			body: JSON.stringify(body_profile),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				setProfile(responseJson);
				setMessage(" profile guardado correctamente");
			});
	}

	//PROFILE
	//UPDATE PROFILE
	function updateProfile() {
		let body_profile = {
			user_id: user.id,
			birth: birth,
			city: city,
			country: country
			// gender: gender
		};

		setMessage("");
		fetch(process.env.BACKEND_URL + "/api/profileupdate/" + profile.id, {
			method: "PUT",
			body: JSON.stringify(body_profile),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(responseJson => {
				setProfile(body_profile);
				setMessage(" se ha modificado correctamente");
			});
	}

	//POST
	//GET ALL POSTS with comments&likes
	if (user !== null) {
		useEffect(() => {
			fetch(process.env.BACKEND_URL + "/api/posts/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setPosts(resultJson);
				});
		}, []);
	}

	//POST
	//CREATE POST
	function createPost() {
		const formData = new FormData();
		formData.append("user_id", user.id);
		formData.append("image", image[0]);
		formData.append("text", "mi primer post");
		let responseOk = false;
		console.log(formData);

		setMessage("");
		fetch(process.env.BACKEND_URL + "/api/post", {
			method: "POST",
			body: formData
		})
			.then(response => {
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
	}

	//POST
	//DELETE POST

	function deletePost(post_id) {
		fetch(process.env.BACKEND_URL + "/api/postdelete/" + post_id, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(resultJson => {
				let arrayCopy = [...posts];
				let arrayPos = arrayCopy.findIndex(item => item.id === post_id);
				arrayCopy.splice(arrayPos, 1);
				setPosts(arrayCopy);
			});
	}

	//COMMENTS
	//GET ALL COMMENTS+LIKES by user_id
	if (user !== null) {
		useEffect(() => {
			fetch(process.env.BACKEND_URL + "/api/comments/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setComments(resultJson);
				});

			fetch(process.env.BACKEND_URL + "/api/likes/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setLikes(resultJson);
				});
		}, []);
	}

	//CREATE COMMENT OF A POST
	function createComment(post_id) {
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
				let arrayCopy = [...comments, responseJson];
				setComments(arrayCopy);
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
				let arrayCopy = [...comments];
				let arrayPos = arrayCopy.findIndex(item => item.id === comment_id);
				arrayCopy.splice(arrayPos, 1);
				setComments(arrayCopy);
			});
	}

	//LIKES
	//GET ALL LIKES by user_id
	if (user !== null) {
		useEffect(() => {
			fetch(process.env.BACKEND_URL + "/api/comments/" + user.id, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => {
					setComments(resultJson);
				});
		}, []);
	}

	//LIKES
	//SET LIKE OF A POST

	// function updateTodo(newTitle, id) {
	// 	fetch("https://jsonplaceholder.typicode.com/todos/" + id + "/", {
	// 		method: "PUT",
	// 		body: JSON.stringify({
	// 			id: id,
	// 			title: newTitle,
	// 			body: "",
	// 			userId: 1
	// 		}),
	// 		headers: {
	// 			"Content-type": "application/json; charset=UTF-8"
	// 		}
	// 	})
	// 		.then(response => {
	// 			return response.json();
	// 		})
	// 		.then(responseJson => {
	// 			console.log(responseJson);
	// 			// let newTodos = [...todos];
	// 			// newTodos.push(responseJson);
	// 			// setTodos(newTodos);
	// 			// SetNewTodo(" ");
	// 		});
	// }

	// function deleteTodo(id) {
	// 	fetch("https://jsonplaceholder.typicode.com/todos/" + id + "/", {
	// 		method: "DELETE"
	// 	}).then(response => {
	// 		if (response.ok) {
	// 			let positionToDelete = -1;

	// 			let newTodos = [...todos];
	// 			for (let i = 0; i < todos.length; i++) {
	// 				let newTodo = newTodos[i];
	// 				if (newTodo.id === id) {
	// 					positionToDelete = i;
	// 				}
	// 			}
	// 			if (positionToDelete > -1) {
	// 				newTodos.splice(positionToDelete, 1);
	// 				setTodos(newTodos);
	// 			} else console.log("error");
	// 		}
	// 	});
	// }
	return (
		<body>
			<button onClick={() => createProfile()}>Save Profile </button>
			<button onClick={() => updateProfile()}>Update Profile</button>
			<div>
				<input type="file" onChange={event => setImage(event.currentTarget.files)} />
				<button onClick={() => createPost()}>Post</button>
				<button onClick={() => deletePost(1)}>Delete Post</button>
			</div>
			<div>
				<button onClick={() => createComment(4)}>Comment</button>
				<button onClick={() => deleteComment(5)}>Delete Comment</button>
			</div>
			<div>
				<button onClick={() => LikeComment()}>Like comment</button>
				<button onClick={() => DeleteLike()}>Delete Like</button>
			</div>

			<form action="/action_page.php" className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
				<h2 className="w3-center">Tu Perfil</h2>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-user" />
					</div>

					<div className="w3-rest">
						<input className="w3-input w3-border" name="first" type="text" placeholder={user.username} />
					</div>
				</div>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-user" />
					</div>
					<div className="w3-rest">
						<input className="w3-input w3-border" name="last" type="text" placeholder="Apellido" />
					</div>
				</div>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-user" />
					</div>
					<div className="w3-rest">
						<input
							className="w3-input w3-border"
							name="last"
							type="text"
							placeholder="Ciudad"
							onChange={event => {
								setCity(event.target.value);
							}}
						/>
					</div>
				</div>
				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-user" />
					</div>
					<div className="w3-rest">
						<input
							className="w3-input w3-border"
							name="last"
							type="text"
							placeholder="Pais"
							onChange={event => {
								setCountry(event.target.value);
							}}
						/>
					</div>
				</div>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-envelope-o" />
					</div>
					<div className="w3-rest">
						<input className="w3-input w3-border" name="email" type="text" placeholder={user.email} />
					</div>
				</div>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-phone" />
					</div>
					<div className="w3-rest">
						<input
							className="w3-input w3-border"
							name="birth"
							type="text"
							placeholder="Birth Date"
							onChange={event => {
								setBirth(event.target.value);
							}}
						/>
					</div>
				</div>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-pencil" />
					</div>
					<div className="w3-rest">
						<input className="w3-input w3-border" name="message" type="text" placeholder="Message" />
					</div>
				</div>

				<input className="w3-radio w3-margin" type="radio" name="gender" value="male" />
				<label>Hombre</label>

				<input className="w3-radio w3-margin" type="radio" name="gender" value="female" />
				<label>Mujer</label>

				<input className="w3-radio w3-margin" type="radio" name="gender" value="" />
				<label>Otros</label>
				<button
					className="w3-button w3-block w3-section w3-blue w3-ripple w3-padding "
					style={{ width: "400px" }}>
					Guardar
				</button>
			</form>
		</body>
	);
}
