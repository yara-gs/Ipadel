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
	const [editCourt_name, setEditCourt_name] = useState(props.court.court_name);
	const [editLigth, setEditLigth] = useState(props.court.light);
	const [editPlayers, setEditPlayers] = useState(props.court.players);
	const [editBtn, setEditBtn] = useState(false);

	let courtUpdated = {
		court_name: editCourt_name,
		light: editLigth,
		players: editPlayers,
		sportcenter_id: props.court.sportcenter_id
	};

	if (props.addCourtBtn && editBtn == false) {
		setEditBtn(true);
	}

	const handleChange_Court_name = event => {
		setEditCourt_name(event.target.value);
	};

	const handleChange_Players = event => {
		setEditPlayers(event.target.value);
	};
	const handleChange_Ligth = event => {
		setEditLigth(event.target.value);
	};

	function create_update_Court() {
		if (props.addCourtBtn) {
			props.createCourt(courtUpdated);
			// props.closeNewCourt();
		} else {
			props.updateCourt(courtUpdated, props.court.id);
		}
		setEditBtn(false);
	}

	function closeNewCourt() {
		setEditBtn(false);
		if (props.addCourtBtn) {
			props.closeNewCourt();
		}
	}

	return (
		<div className="d-flex justify-content-center ">
			<div className="card courtcard text-dark bg-light">
				<div className="card-header d-flex justify-content-between">
					<div>
						{editBtn ? (
							<TextField
								id="standard"
								label={props.court.court_name}
								onChange={handleChange_Court_name}
							/>
						) : (
							<h5>{props.court.court_name}</h5>
						)}
					</div>
					{editBtn ? (
						<div>
							<div type="button" className="far fa-save pr-2" onClick={() => create_update_Court()} />
							<div type="button" className="far fa-times-circle" onClick={closeNewCourt} />
						</div>
					) : (
						<div>
							<div type="button" className=" far fa-edit pr-2" onClick={() => setEditBtn(!editBtn)} />
							<div
								type="button"
								className=" far fa-trash-alt"
								onClick={() => props.deleteCourt(props.court.id)}
							/>
						</div>
					)}
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
	addCourtBtn: PropTypes.boolean,
	createCourt: PropTypes.func,
	updateCourt: PropTypes.func,
	deleteCourt: PropTypes.func,
	closeNewCourt: PropTypes.func
};
