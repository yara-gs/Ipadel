import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";
import "w3-css/w3.css";
import "../../../styles/miRedFriendRequest.scss";
import PropTypes from "prop-types";

export default function MiRedFriendRequest() {
	const inputRef = React.useRef(null);
	const [inputValue, setInputValue] = React.useState("");
	const [userList, setUserList] = React.useState([
		{ name: "Nicolas Balcells", username: "NicolasBalcells" },
		{ name: "Yara gomez", username: "YaraGomez" },
		{ name: "Ysamar ALcantara", username: "YsamarAlcantara" }
	]);
	const [partialMention, setPartialMention] = React.useState(null);
	const [showSuggestions, setShowSuggestions] = React.useState(false);

	const [suggestionList, setSuggestionList] = React.useState(["NicolasBalcells", "YaraGomez", "YsamarAlcantara"]);

	function onChange(event) {
		const regexp = /@[a-zA-Z0-9]*$/;
		if (regexp.test(event.target.value)) {
			setPartialMention(event.target.value.split("@").pop());
			setShowSuggestions(true);
		} else {
			setShowSuggestions(false);
		}
		setInputValue(event.target.value);
	}

	function focusInput() {
		inputRef.current.focus();
	}

	return (
		<React.Fragment>
			<div className="w3-col">
				<div className="w3-card w3-round w3-white w3-center">
					<div className="w3-container">
						<h3>Add Friends</h3>
						<p />
						<input ref={inputRef} type="text" value={inputValue} onChange={onChange} />
						{showSuggestions && (
							<Suggestions
								inputValue={inputValue}
								suggestionList={suggestionList}
								applyMention={onChange}
								focusInput={focusInput}
								partialMention={partialMention}
							/>
						)}
						<span>Find Friends</span>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

function Suggestions(props) {
	function selectSuggestion(username) {
		const regexp = /@[a-zA-Z0-9]*$/;
		const newValue = props.inputValue.replace(regexp, username + " ");
		props.applyMention({ target: { value: newValue } }); // THIS MIMICS AN ONCHANGE EVENT
		props.focusInput();
	}

	const suggestionItems = props.suggestionList
		.filter(item => item.includes(props.partialMention))
		.map(item => (
			<div key={item} className="item" onClick={() => selectSuggestion("@" + item)}>
				@{item}
			</div>
		));

	return <div className="container">{suggestionItems}</div>;
}

Suggestions.propTypes = {
	inputValue: PropTypes.string,
	partialMention: PropTypes.string,
	applyMention: PropTypes.string,
	focusInput: PropTypes.string,
	suggestionList: PropTypes.string
};
