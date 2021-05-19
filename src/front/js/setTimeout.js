import React, { useEffect } from "react";

export default function setTimeout_useEffect(text, setText, time) {
	let change;
	if (text != "") {
		change = 1;
	} else {
		change = 0;
	}
	// despues de borrar se muestra un mensaje que desaparece al 1,5seg
	useEffect(() => {
		const timer = setTimeout(() => {
			setText("");
		}, time);
		return () => clearTimeout(timer);
	}, [change]);
	return text;
}
