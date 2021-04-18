import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const Profile = () => {
	const [username, setUsername] = useState("");

	const { actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		let acessToken = actions.getAccessToken();
		if (!acessToken) {
			history.push("/login");
			return;
		}
		fetch(process.env.BACKEND_URL + "/api/profile", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + actions.getAccessToken()
			}
		})
			.then(response => response.json())
			.then(responseJson => setUsername(responseJson.username));
	}, []);
	return (
		<div className="jumbotron">
			<div>Username {username}</div>
		</div>
	);
};
export default Profile;
