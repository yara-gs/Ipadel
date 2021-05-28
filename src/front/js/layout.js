import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import Mynavbar from "./component/navbar";

import MiRedComponentes from "./pages/miRedComponentes";
import SignAndLogin from "./pages/signAndLogin";
import Centers from "./pages/sportCenter/centers";
import CenterForm from "./pages/sportCenter/centerForm";
import ConfigureCourts from "./pages/sportCenter/configure-courts.jsx";
import CenterImages from "./pages/sportCenter/centerImages.jsx";
import ChooseCenter from "./pages/courtReservation/chooseCenter.jsx";
import Reservations from "./pages/courtReservation/reservations.jsx";

import ConfigureProfile from "./pages/configure-profile";

import Footer from "./component/footer";
import { Forgot } from "./pages/forgot";
import { NewPassword } from "./pages/new_password";
//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Mynavbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/sign">
							<SignAndLogin sign={true} />
						</Route>
						<Route exact path="/login">
							<SignAndLogin sign={false} />
						</Route>
						<Route exact path="/configure-profile">
							<ConfigureProfile />
						</Route>
						<Route exact path="/home">
							<Home />
						</Route>
						<Route exact path="/mired">
							<MiRedComponentes />
						</Route>
						<Route exact path="/newcenter">
							<CenterForm />
						</Route>
						<Route exact path="/configure-courts">
							<ConfigureCourts />
						</Route>
						<Route exact path="/uploadCenterImages">
							<CenterImages />
						</Route>
						<Route exact path="/centers">
							<Centers />
						</Route>
						<Route exact path="/forgot">
							<Forgot />
						</Route>
						<Route exact path="/new_password">
							<NewPassword />
						</Route>
						<Route exact path="/choose-center">
							<ChooseCenter />
						</Route>
						<Route exact path="/my-reservations">
							<Reservations />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};
export default injectContext(Layout);
