import React, { useState,useContext } from "react";
import { Context } from "../store/appContext";

const Profile = () => {
	const [email, setEmail] = useState("");
	
    const { actions } = useContext(Context);
    const history = useHistory();

	useEffect(() => {
        let acessToken = actions.getAccessToken();
        if(!acessToken) {
            history.push("/login");
            return;
        }
        fetch("https://3001-gray-crawdad-17bzh6pq.ws-eu03.gitpod.io/api/profile", {
            method: "GET"
            headers: {
				"Content-Type": "application/json",
                "Authorization": "Bearer" + actions.getAccessToken()
			},
        })
        .then(response => response.json())
        .then(responseJson => setEmail(responseJson.email));
    }, []);
return (
		<div>
			<h2 className="title">Email</h2>
						</div>
    );
};
export default Profile;