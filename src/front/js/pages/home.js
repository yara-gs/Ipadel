import React, { useContext } from "react";
import { Context } from "../store/appContext";
import CardGroup from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "../../styles/home.scss";

import "w3-css/w3.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div ClassName="body">
			<div className="w3-display-container w3-animate-opacity w3-center " id="home">
				<div
					className="imgHome "
					style={{
						backgroundImage: `url("https://images.squarespace-cdn.com/content/v1/549f1861e4b0bef254f22afc/1462114172959-Y9T8W6W98MICCI0TODO1/ke17ZwdGBToddI8pDm48kBsT7cUqmJkeerpS6TwQRhh7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMSjfRWV4lzUtF-jHOHg2xk8NWBH1IOVk38JKo6459U1RZGjoBKy3azqku80C789l0lqfkVpRp1g_2L-WsTQRP4K7h9ymmROaLsBkEHDWqOvIX7NXAuwIzfiT9P6QZ5g6qg/image-asset.jpeg?format=1500w")`
					}}
				/>

				<div className="w3-display-middle w3-padding-large w3-wide w3-center ">
					<br />
					<h1 className="w3-hide-medium w3-hide-small w3-xxxlarge w3-text-white ">No te quedes sin jugar</h1>
					<br />
					<Link to="/choose-center">
						<button className="w3-button w3-orange w3-hover-grey w3-round-xlarge w3-center w3-xlarge">
							Jugar Ahora{" "}
						</button>
					</Link>
				</div>
			</div>

			<div className="w3-container" style={{ padding: "100px 16px" }} id="about">
				<h3 className="w3-center" style={{ marginBottom: "50px" }}>
					ABOUT iPadel
				</h3>
				<p className="w3-center w3-large" />
				<p className="w3-center w3-large" />

				<div className="w3-row-padding w3-center" style={{ margin_top: "64px" }}>
					<div className="w3-quarter">
						<i className="fa fa-desktop w3-margin-bottom w3-jumbo w3-center" />
						<p className="w3-large">Interactivo</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore.
						</p>
					</div>
					<div className="w3-quarter">
						<i className="fa fa-heart w3-margin-bottom w3-jumbo" />
						<p className="w3-large">Pasion</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore.
						</p>
					</div>
					<div className="w3-quarter">
						<i className="fa fa-male w3-margin-bottom w3-jumbo" />
						<p className="w3-large">Personas</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore.
						</p>
					</div>
					<div className="w3-quarter">
						<i className="fa fa-cog w3-margin-bottom w3-jumbo" />
						<p className="w3-large">Soporte</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore.
						</p>
					</div>
				</div>
			</div>

			<div className="w3-container w3-light-grey" style={{ padding: "128px 16px" }}>
				<div className="w3-row-padding">
					<div className="w3-col m6">
						<h3>Colaboramos con tu gimnasio</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore.
						</p>
						<p>
							<a href="#work" className="w3-button w3-black">
								<i className="fa fa-th"> </i> Nuestros GYM!
							</a>
						</p>
					</div>
					<div className="w3-col m6">
						<img
							className="w3-image w3-round-large"
							src="https://media.istockphoto.com/photos/sporty-couple-giving-high-five-to-each-other-at-gym-picture-id1178288246?k=6&m=1178288246&s=612x612&w=0&h=dBsdHnKS9HrW6-RDL7YwRH61yy5wSw0BccylNulREd0="
							alt="Buildings"
							width="700"
							height="394"
						/>
					</div>
				</div>
			</div>

			<div className="w3-container" style={{ padding: "128px 16px" }} id="team">
				<h3 className="w3-center">Equipo iPadel</h3>
				<p className="w3-center w3-large">Los que hacen esto</p>
				<div className="w3-row-padding w3-grayscale" style={{ margin_top: "64px" }}>
					<div className="w3-col l3 m6 w3-margin-bottom">
						<div className="w3-card">
							<img
								src="http://ipadel.s3.amazonaws.com/perfil_fullstack.jpg"
								alt="Yara"
								style={{ width: "100%", height: "234px" }}
							/>
							<div className="w3-container">
								<h3>Yara Gomez</h3>
								<p className="w3-opacity">Full Stack Developer</p>
								<p>
									Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque
									elementum.
								</p>
								<p>
									<button className="w3-button w3-light-grey w3-block">
										<i className="fa fa-envelope" /> Contacta
									</button>
								</p>
							</div>
						</div>
					</div>
					<div className="w3-col l3 m6 w3-margin-bottom">
						<div className="w3-card">
							<img
								src="https://www.w3schools.com/w3images/team1.jpg"
								alt="Ysamar"
								style={{ width: "100%", height: "234px" }}
							/>
							<div className="w3-container">
								<h3>Ysamar Alcantara</h3>
								<p className="w3-opacity">Full Stack Developer</p>
								<p>
									Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque
									elementum.
								</p>
								<p>
									<button className="w3-button w3-light-grey w3-block">
										<i className="fa fa-envelope" /> Contacta
									</button>
								</p>
							</div>
						</div>
					</div>
					<div className="w3-col l3 m6 w3-margin-bottom">
						<div className="w3-card">
							<img
								src="https://www.w3schools.com/w3images/team3.jpg"
								alt="Nicolas"
								style={{ width: "100%", height: "234px" }}
							/>
							<div className="w3-container">
								<h3>Nicolas Balcells</h3>
								<p className="w3-opacity">Full Stack Developer</p>
								<p>
									Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque
									elementum.
								</p>
								<p>
									<button className="w3-button w3-light-grey w3-block">
										<i className="fa fa-envelope" /> Contacta
									</button>
								</p>
							</div>
						</div>
					</div>
					<div className="w3-col l3 m6 w3-margin-bottom">
						<div className="w3-card">
							<img
								src="https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/260/original/4g-logo-negro-01.png"
								style={{ width: "100%", height: "234px" }}
							/>
							<div className="w3-container">
								<h3>4Geeks Academy</h3>
								<p className="w3-opacity">Sempai</p>
								<p>
									Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque
									elementum.
								</p>
								<p>
									<button className="w3-button w3-light-grey w3-block">
										<i className="fa fa-envelope" /> Contact
									</button>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="w3-container w3-row w3-center w3-dark-grey w3-padding-64">
				<div className="w3-quarter">
					<span className="w3-xxlarge">14+</span>
					<p>Colaboradores</p>
				</div>
				<div className="w3-quarter">
					<span className="w3-xxlarge">55+</span>
					<p>Pistas</p>
				</div>
				<div className="w3-quarter">
					<span className="w3-xxlarge">100+</span>
					<p>Jugadores</p>
				</div>
				<div className="w3-quarter">
					<span className="w3-xxlarge">50+</span>
					<p>Torneos</p>
				</div>
			</div>

			<div className="w3-container" style={{ padding: "128px 16px" }} id="work">
				<h3 className="w3-center">Nuestros GYM</h3>
				<p className="w3-center w3-large">Siempre cerca de ti</p>

				<div className="w3-row-padding" style={{ margin_top: "64px" }}>
					<div className="w3-col l3 m6">
						<img
							src="https://media.istockphoto.com/photos/empty-gym-picture-id1132006407?k=6&m=1132006407&s=612x612&w=0&h=vOx89bJoTm6tqEMRRZxsmzfdr1jwrmrbE-0yfm7sm74="
							style={{ width: "100%" }}
							className="w3-hover-opacity"
							alt="A microphone"
						/>
					</div>
					<div className="w3-col l3 m6">
						<img
							src="https://media.istockphoto.com/photos/gym-training-on-stationary-bikes-picture-id1127485222?k=6&m=1127485222&s=612x612&w=0&h=jKvfqIMYovapPlx9wMQdjl82tLaR1emKjIY38pX0l3Q="
							style={{ width: "100%" }}
							className="w3-hover-opacity"
							alt="A phone"
						/>
					</div>
					<div className="w3-col l3 m6">
						<img
							src="https://media.istockphoto.com/photos/happy-athletic-people-jogging-on-treadmills-in-a-health-club-picture-id1089939832?k=6&m=1089939832&s=612x612&w=0&h=o3mjGEu7ru4R-_seQ6PFJ5b90qTIy5c8K5XWsRW-4dk="
							style={{ width: "100%" }}
							className="w3-hover-opacity"
							alt="A drone"
						/>
					</div>
					<div className="w3-col l3 m6">
						<img
							src="https://media.istockphoto.com/photos/this-is-where-youll-challenge-yourself-picture-id1134312588?k=6&m=1134312588&s=612x612&w=0&h=ME1HmZs5jmnL0iVTcASWJX3DJbfhLo9n-Y0iEW06l0Q="
							style={{ width: "100%" }}
							className="w3-hover-opacity"
							alt="Soundbox"
						/>
					</div>
				</div>

				<div className="w3-row-padding w3-section">
					<div className="w3-col l3 m6">
						<img
							src="https://media.istockphoto.com/photos/young-woman-exercising-on-treadmill-picture-id1059616710?k=6&m=1059616710&s=612x612&w=0&h=5N2j3lwDA4m6gocyZg7-u5IDtwxAG052KPp8lPwXmbw="
							style={{ width: "100%" }}
							className="w3-hover-opacity"
							alt="A tablet"
						/>
					</div>
					<div className="w3-col l3 m6">
						<img
							src="https://media.istockphoto.com/photos/side-view-of-beautiful-muscular-woman-running-on-treadmill-picture-id1132086660?k=6&m=1132086660&s=612x612&w=0&h=oe1fvDlhc9n3aZnproEW5IGIcykXggkPZ3IMzm7yyDo="
							style={{ width: "100%" }}
							className="w3-hover-opacity"
							alt="A camera"
						/>
					</div>
					<div className="w3-col l3 m6">
						<img
							src="https://media.istockphoto.com/photos/group-of-athletic-women-on-exercise-bikes-in-a-health-club-picture-id1173507478?k=6&m=1173507478&s=612x612&w=0&h=cM1aq__DCQG0593HPiZX4BRea4YsC_1zDWVYsDrs2Gg="
							style={{ width: "100%" }}
							className="w3-hover-opacity"
							alt="A typewriter"
						/>
					</div>
					<div className="w3-col l3 m6">
						<img
							src="https://media.istockphoto.com/photos/happy-athletic-woman-giving-highfive-to-her-friend-on-a-break-in-a-picture-id1179543750?k=6&m=1179543750&s=612x612&w=0&h=M---8yNpJWVCaKZcvQOxUWlLpwpLYoQ18SybT2dsMTc="
							style={{ width: "100%" }}
							className="w3-hover-opacity"
							alt="A tableturner"
						/>
					</div>
				</div>
			</div>

			<div id="modal01" className="w3-modal w3-black">
				<span
					className="w3-button w3-xxlarge w3-black w3-padding-large w3-display-topright"
					title="Close Modal Image">
					×
				</span>
				<div className="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
					<img id="img01" className="w3-image" />
					<p id="caption" className="w3-opacity w3-large" />
				</div>
			</div>

			<div className="w3-container w3-light-grey" style={{ padding: "128px 16px" }} id="contact">
				<h3 className="w3-center">CONTACTO</h3>
				<p className="w3-center w3-large">Ponte en contacto con nosotros</p>
				<div style={{ margin_top: "48px" }}>
					<form action="/action_page.php">
						<p>
							<input
								width="100%"
								className="w3-input w3-border"
								type="text"
								placeholder="Name"
								required
								name="Name"
							/>
						</p>
						<p>
							<input
								className="w3-input w3-border"
								type="text"
								placeholder="Email"
								required
								name="Email"
							/>
						</p>
						<p>
							<input
								className="w3-input w3-border"
								type="text"
								placeholder="Subject"
								required
								name="Subject"
							/>
						</p>
						<p>
							<input
								className="w3-input w3-border"
								type="text"
								placeholder="Message"
								required
								name="Message"
							/>
						</p>
						<p>
							<button className="w3-button w3-black" type="submit">
								<i className="fa fa-paper-plane" /> Enviar
							</button>
						</p>
					</form>
					<div
						className="imgHome "
						style={{
							backgroundImage: `url("https://pdpla.com/images/easyblog_articles/1285/TennisBall.jpg")`
						}}
					/>
				</div>
			</div>
		</div>
	);
};
