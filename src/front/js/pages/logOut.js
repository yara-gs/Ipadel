import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

export const LogOut = () => {
	localStorage.clearItem("token");
	return history.push("/login");
};
