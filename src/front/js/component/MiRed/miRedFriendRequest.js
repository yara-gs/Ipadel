import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/mired.scss";
import "w3-css/w3.css";
import "../../../styles/miRedFriendRequest.scss";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

export default function MiRedFriendRequest(props) {
	const inputRef = React.useRef(null);
	const [inputValue, setInputValue] = React.useState("");
	const [partialMention, setPartialMention] = React.useState(null);
	const [showSuggestions, setShowSuggestions] = React.useState(false);
	const [suggestionList, setSuggestionList] = useState(null);
	const [selectedFriend, setSelectedFriend] = useState(null);

	if ((props.usersList != null) & (suggestionList === null)) {
		let arrayCopy = [];
		for (let i = 0; i < props.usersList.length; i++) {
			let obj = props.usersList[i];
			obj.username = props.usersList[i].username.toLowerCase();
			arrayCopy.push(obj);
		}
		setSuggestionList(arrayCopy);
	}

	function onChange(event) {
		const regexp = /@[a-zA-Z0-9]*$/;
		let username_lowerCase = event.target.value.toLowerCase();

		if (regexp.test(username_lowerCase) & (suggestionList != null)) {
			setPartialMention(username_lowerCase.split("@").pop());
			setShowSuggestions(true);
		} else {
			setShowSuggestions(false);
		}

		setInputValue(username_lowerCase);
	}

	function focusInput() {
		inputRef.current.focus();
	}

	function addFriend() {
		props.addFriend(selectedFriend);
	}

	function selectedItem(item) {
		setSelectedFriend(item);
	}

	return (
		<React.Fragment>
			<div className="w3-col">
				<div className="w3-card w3-round w3-white w3-center">
					<div className="w3-container">
						<h3>Añadir amigos </h3>
						<p />
						<input ref={inputRef} type="text" value={inputValue} onChange={onChange} />
						{showSuggestions && (
							<Suggestions
								inputValue={inputValue}
								suggestionList={suggestionList}
								applyMention={onChange}
								focusInput={focusInput}
								partialMention={partialMention}
								selectedItem={selectedItem}
							/>
						)}
						<p>
							<Button variant="primary" onClick={() => addFriend()}>
								Seguir
							</Button>
						</p>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

function Suggestions(props) {
	function selectSuggestion(item) {
		const regexp = /@[a-zA-Z0-9]*$/;
		const newValue = props.inputValue.replace(regexp, item.username + " ");
		props.applyMention({ target: { value: newValue } }); // THIS MIMICS AN ONCHANGE EVENT
		props.focusInput();
		props.selectedItem(item);
	}

	const suggestionItems = props.suggestionList
		.filter(item => item.username.includes(props.partialMention))
		.map(item => (
			<div
				key={item}
				className="item"
				onClick={() => {
					selectSuggestion(item);
				}}>
				@{item.username}
			</div>
		));

	return <div className="container">{suggestionItems}</div>;
}

Suggestions.propTypes = {
	inputValue: PropTypes.string,
	partialMention: PropTypes.string,
	applyMention: PropTypes.string,
	focusInput: PropTypes.string,
	suggestionList: PropTypes.string,
	selectedItem: PropTypes.object
};

MiRedFriendRequest.propTypes = {
	usersList: PropTypes.array,
	addFriend: PropTypes.func
};
