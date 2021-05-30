import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import "../../../styles/mired.scss";
import "w3-css/w3.css";

export default function MiRedPerfil(props) {
	const { actions, store } = useContext(Context);
	let profile = props.profile;
	let user = props.user;

	const [inputuserImage, setInputUserImage] = useState(null);
	const [userImage, setUserImage] = useState("https://www.w3schools.com/w3images/avatar2.png");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [show_SaveImage, setShow_SaveImage] = useState(false);
	// let user = actions.getUser();
	const fileInput = useRef(null);
	let city = "";
	let country = "";

	useEffect(() => {
		get_userimage();
	}, []);

	useEffect(() => {
		get_userimage();
	}, [user]);

	function get_userimage() {
		if (props.user !== null) {
			setUserImage("https://www.w3schools.com/w3images/avatar2.png");
			if (props.user.url_image !== "") {
				setUserImage(props.user.url_image);
			}
		}
	}

	useEffect(() => {
		set_userimage();
	}, [userImage]);

	function set_userimage() {
		if (props.user !== null) {
			let user_with_image = user;
			user_with_image.url_image = userImage;
			actions.saveUser(user_with_image);
		}
	}

	function upload_userImage() {
		const formData = new FormData();
		formData.append("image", inputuserImage[0]);
		setMessage("");
		if (user) {
			fetch(process.env.BACKEND_URL + "/api/user_image/" + user.id, {
				method: "PUT",
				body: formData
			})
				.then(response => response.json())
				.then(responseJson => {
					setUserImage(responseJson);
					setMessage("Imagenes importadas correctamente");
					setShow_SaveImage(false);
				})

				.catch(error => {
					setError(error.message);
					setMessage("Fallo al importar imagenes");
				});
		}
	}

	const onBtnClick = () => {
		/*Collecting node-element and performing click*/
		fileInput.current.click();
		setShow_SaveImage(true);
	};

	if (profile) {
		city = profile.city.charAt(0).toUpperCase() + profile.city.slice(1);
		country = profile.country.charAt(0).toUpperCase() + profile.country.slice(1);
	}

	return (
		<div className="w3-col">
			<div className="w3-card w3-round w3-white">
				<div className="w3-container">
					{user ? <div className="w3-center  pb-2 username">{user.username}</div> : ""}

					<p className="w3-center d-flex justify-content-center inputfile-avatar">
						<input
							type="file"
							name="image"
							ref={fileInput}
							onChange={event => setInputUserImage(event.currentTarget.files)}
							style={{ display: "none" }}
						/>
						<button
							className="user-image"
							style={{
								backgroundImage: `url(${userImage})`,
								width: "106px",
								height: "106px"
							}}
							onClick={onBtnClick}></button>

						<p />
					</p>
					{show_SaveImage ? (
						<p className="w3-center d-flex justify-content-center post-btn ">
							<button onClick={() => upload_userImage()} className=" w3-btn w3-green">
								Guardar imagen
							</button>
						</p>
					) : (
						""
					)}

					<p>
						<i className="fa fa-home fa-fw w3-margin-right w3-text-theme" /> {city}, {country}
					</p>

					{profile ? (
						<p>
							<i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme" /> {profile.birth}
						</p>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}

MiRedPerfil.propTypes = {
	profile: PropTypes.object,
	user: PropTypes.object
};
