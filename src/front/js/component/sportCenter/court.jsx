import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../styles/center.scss";

import { Modal, Button } from "react-bootstrap";
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
	const [newCourtName, setnewCourtName] = useState(props.court.court_name);
	const [showConfirmDelteCourt, setShowConfirmDeleteCourt] = useState(false);

	let courtUpdated = {
		id: props.court.id,
		court_name: editCourt_name,
		light: editLigth,
		players: editPlayers,
		sportcenter_id: props.court.sportcenter_id
	};
	const handleClose = () => setShowConfirmDeleteCourt(false);

	if (props.addCourtBtn && (newCourtName != props.court.court_name || editBtn == false)) {
		setEditBtn(true);
		setnewCourtName(props.court.court_name);
		setEditCourt_name(props.court.court_name);
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
		setEditBtn(false);
		if (props.addCourtBtn) {
			props.createCourt(courtUpdated);
			setEditBtn(false);
		} else {
			props.updateCourt(courtUpdated, props.court.id);
		}
		setEditBtn(false);
	}

	function delete_Court() {
		props.deleteCourt(props.court);
		setShowConfirmDeleteCourt(false);
	}

	function closeNewCourt() {
		setEditBtn(false);
		if (props.addCourtBtn) {
			props.closeNewCourt();
		}
	}

	function showSaveButton() {
		let return_html = "";
		if (
			props.court.court_name != editCourt_name ||
			props.addCourtBtn ||
			props.court.players != editPlayers ||
			props.court.light != editLigth
		) {
			return_html = <div type="button" className="far fa-save pr-2" onClick={() => create_update_Court()} />;
		} else {
			return_html = "";
		}
		return return_html;
	}

	let return_Cardhtml = "";

	if (props.addCourtBtn) {
		return_Cardhtml = "card courtcard newcard text-dark bg-light";
	} else {
		return_Cardhtml = "card courtcard text-dark bg-light";
	}

	return (
		<div className="d-flex justify-content-center ">
			<div className={return_Cardhtml}>
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
							{/* <div className="newcourts_message">Crear pista nueva</div> */}
							{showSaveButton()}

							<div type="button" className="far fa-times-circle" onClick={closeNewCourt} />
						</div>
					) : (
						<div>
							<div type="button" className=" far fa-edit pr-2" onClick={() => setEditBtn(!editBtn)} />
							<div
								type="button"
								className=" far fa-trash-alt"
								onClick={() => setShowConfirmDeleteCourt(true)}
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

			<Modal show={showConfirmDelteCourt} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="far fa-trash-alt fa-s" /> {courtUpdated.court_name}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					¿Desea realmente eliminar {courtUpdated.court_name} ? Pulse confirmar para continuar{" "}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => delete_Court()}>Confirmar</Button>
				</Modal.Footer>
			</Modal>
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
