import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../styles/center.scss";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 220
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

export default function Court(props) {
	const classes = useStyles();
	const [editLigth, setEditLigth] = React.useState(props.court.light);
	const [editPlayers, setEditPlayers] = useState(props.court.players);
	const [editBtn, setEditBtn] = useState(false);
	//comment

	if (props.court.court_name == "Nueva Pista" && editBtn == false) {
		setEditBtn(true);
		console.log("hola");
	}
	let obj = props.court;
	// obj.label = inputUpdateValue;
	props.updateCourt(obj);

	const handleChange_Players = event => {
		setEditPlayers(event.target.value);
	};
	const handleChange_Ligth = event => {
		setEditLigth(event.target.value);
	};

	return (
		<div className="d-flex justify-content-center ">
			<div className="card courtcard text-dark bg-light">
				<div className="card-header d-flex justify-content-between">
					<div>
						{editBtn ? (
							<TextField id="standard" label={props.court.court_name} />
						) : (
							<h5>{props.court.court_name}</h5>
						)}
					</div>

					<div>
						<div type="button" className=" far fa-edit pr-2" onClick={() => setEditBtn(!editBtn)} />

						<div type="button" className=" far fa-trash-alt" />
					</div>
				</div>
				<div className="card-body">
					<div className="card-title">
						{editBtn ? (
							<FormControl className={classes.formControl}>
								<InputLabel id="demo-simple-select-label">Jugadores: {props.court.players}</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={editPlayers}
									onChange={handleChange_Players}>
									<MenuItem value={2}>2</MenuItem>
									<MenuItem value={4}>4</MenuItem>
								</Select>
							</FormControl>
						) : (
							// <input type="text" placeholder={props.court.players} />
							<div>Jugadores : {props.court.players} </div>
						)}
					</div>

					<div className="card-title">
						{editBtn ? (
							<FormControl className={classes.formControl}>
								<InputLabel id="demo-simple-select-label">
									Light: {props.court.light ? " Si" : " No"}
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={editLigth}
									onChange={handleChange_Ligth}>
									<MenuItem value={true}>Si</MenuItem>
									<MenuItem value={false}>No</MenuItem>
								</Select>
							</FormControl>
						) : (
							<p>Luz :{props.court.light ? " Si" : " No"}</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

Court.propTypes = {
	court: PropTypes.object,
	updateCourt: PropTypes.func,
	deleteCourt: PropTypes.func
};
