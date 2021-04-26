import { useState, useContext, useEffect } from "react";
import { Context } from "./store/appContext";
import { useHistory } from "react-router-dom";

export default function pushSignPage() {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		let user = null;
		user = actions.getUser();
		if (user === null) {
			history.push("/sign");
		}
	}, []);
}
