import { useState, useContext, useEffect } from "react";
import { Context } from "./store/appContext";
import { useHistory } from "react-router-dom";

export default function pushSignPage() {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	let user = actions.getUser();
	let accesToken = actions.getAccessToken();

	// useEffect(() => {
	// 	console.log(user, accesToken);

	// }, [user]);
	if ((user === null) & (accesToken == null || accesToken == "")) {
		history.push("/login");
	}
}
