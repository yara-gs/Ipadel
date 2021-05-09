import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";
import "w3-css/w3.css";
import "../../../styles/buttons.scss";

export default function MiRedPostText() {
	const { actions, store } = useContext(Context);
	let user = actions.getUser();

	const [postsList, setPostsList] = React.useState([]);
	const [post, setPost] = React.useState("");
	//const [liNewTask, setLiNewTask] = React.useState(null);

	function addPost() {
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

	// function addPost() {
	// 	//	let newList = tasksList.push(task);
	// 	let newList = [post, ...postsList];

	// 	setPostsList(newList);
	// 	console.log(postsList.indexOf(post));
	// 	setPost("");
	// }

	function deletePost(postsListIndex) {
		const newList = postsList.filter((_, index) => index !== postsListIndex);

		setPostsList(newList);
	}
	var d = new Date();
	var hour = d.getHours();

	//useEffect(() => {
	const liNewTask = postsList.map((eachPost, index) => {
		return (
			<div className="w3-container w3-card w3-white w3-round w3-margin" key={index}>
				<br />
				<img
					src="https://www.w3schools.com/w3images/avatar2.png"
					alt="Avatar"
					className="w3-left w3-circle w3-margin-right"
					id="image7"
				/>
				<span className="w3-right w3-opacity">{hour + ".00"}</span>
				{user ? <h4>{user.username}</h4> : ""}
				<br />
				<hr className="w3-clear" />
				<p>{eachPost}</p>
				<div className="w3-row-padding" id="container2">
					<div className="w3-half">
						<img
							src="https://www.w3schools.com/w3images/lights.jpg"
							id="image8"
							alt="Northern Lights"
							className="w3-margin-bottom"
						/>
					</div>
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
					<i className="fa fa-thumbs-up" />  Me Gusta
				</button>
				<button type="button" className="w3-button w3-theme-d2 w3-margin-bottom">
					<i className="fa fa-comment" />  Comment
				</button>
			</div>
		);
	});

	return (
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
							<button type="button" onClick={addPost} className="button_publicar w3-button w3-theme">
								<i className="fa fa-home" />  Publicar
							</button>
						</div>
					</div>
				</div>
			</div>

			{liNewTask}
		</div>
	);
}
