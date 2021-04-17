import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import Sign from "./pages/sign";
import { Home } from "./pages/home";
import MiRedComponentes from "./pages/miRedComponentes";
import Pistas from "./pages/pistas";
import SingUpForm from "./pages/singUpForm";
import { Demo } from "./pages/demo";
import MiRed from "./pages/mired";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Mynavbar from "./component/navbar";
import { Footer } from "./component/footer";
import Profile from "./pages/profile";
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
							<Sign />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
						<Route exact path="/home">
							<Home />
						</Route>
						<Route exact path="/mired">
							<MiRedComponentes />
						</Route>
						<Route exact path="/pistas">
							<Pistas />
						</Route>
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/sing">
							<Sign />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
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
