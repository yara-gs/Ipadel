import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export default function ConfigureProfile() {
	const { actions, store } = useContext(Context);
	let user = actions.getUser();

	const [todos, setTodos] = useState([]);
	const [newTodo, SetNewTodo] = useState("");
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		})
			.then(response => {
				console.log(response);
				return response.json();
			})
			.then(responseJson => {
				setTodos(responseJson);
			});
	}, []);

	function CreateTodo() {
		fetch("https://jsonplaceholder.typicode.com/todos/", {
			method: "POST",
			body: JSON.stringify({
				title: newTodo,
				body: "",
				userId: 1
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				let newTodos = [...todos];
				newTodos.push(responseJson);
				setTodos(newTodos);
				SetNewTodo(" ");
			});
	}

	function updateTodo(newTitle, id) {
		fetch("https://jsonplaceholder.typicode.com/todos/" + id + "/", {
			method: "PUT",
			body: JSON.stringify({
				id: id,
				title: newTitle,
				body: "",
				userId: 1
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => {
				return response.json();
			})
			.then(responseJson => {
				console.log(responseJson);
				// let newTodos = [...todos];
				// newTodos.push(responseJson);
				// setTodos(newTodos);
				// SetNewTodo(" ");
			});
	}

	function deleteTodo(id) {
		fetch("https://jsonplaceholder.typicode.com/todos/" + id + "/", {
			method: "DELETE"
		}).then(response => {
			if (response.ok) {
				let positionToDelete = -1;

				let newTodos = [...todos];
				for (let i = 0; i < todos.length; i++) {
					let newTodo = newTodos[i];
					if (newTodo.id === id) {
						positionToDelete = i;
					}
				}
				if (positionToDelete > -1) {
					newTodos.splice(positionToDelete, 1);
					setTodos(newTodos);
				} else console.log("error");
			}
		});
	}
	return (
		<body>
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
						<input className="w3-input w3-border" name="last" type="text" placeholder="Ciudad" />
					</div>
				</div>
				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-user" />
					</div>
					<div className="w3-rest">
						<input className="w3-input w3-border" name="last" type="text" placeholder="Pais" />
					</div>
				</div>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-envelope-o" />
					</div>
					<div className="w3-rest">
						<input className="w3-input w3-border" name="email" type="text" placeholder="Email" />
					</div>
				</div>

				<div className="w3-row w3-section">
					<div className="w3-col" style={{ width: "50px" }}>
						<i className="w3-xxlarge fa fa-phone" />
					</div>
					<div className="w3-rest">
						<input className="w3-input w3-border" name="phone" type="text" placeholder="Phone" />
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
