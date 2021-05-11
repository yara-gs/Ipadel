const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: "",
			user: null,
			localstorage: {},
			sportCenter: null,
			sportCenterImages: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			saveAccessToken(accessToken) {
				setStore({ accessToken: accessToken });
				localStorage.setItem("access_token", accessToken);
			},
			getAccessToken: () => {
				let store = getStore();
				if (store.accessToken) {
					return store.accessToken;
				} else {
					return localStorage.getItem("access_token");
				}
			},
			saveUser(user) {
				let user_store = user;
				user_store["msg"] = "";
				setStore({ user: user_store });
				console.log(user_store);
				localStorage.setItem("user", JSON.stringify(user_store));
			},
			getUser: () => {
				let store = getStore();
				let user = null;
				if (store.user) {
					user = store.user;
				} else {
					user = JSON.parse(localStorage.getItem("user"));
				}

				return user;
			},

			saveSportCenter(sportCenter) {
				setStore({ sportCenter: sportCenter });
				localStorage.setItem("sportCenter", JSON.stringify(sportCenter));
			},
			getSportCenter: () => {
				let store = getStore();
				let sportCenter = null;
				if (store.sportCenter) {
					sportCenter = store.sportCenter;
				} else {
					sportCenter = JSON.parse(localStorage.getItem("sportCenter"));
				}

				return sportCenter;
			},
			setSportCenterImages: newImages => {
				let store = getStore();
				let arrayCopy = store.sportCenterImages;

				for (let i = 0; i < newImages.length; i++) {
					arrayCopy.push(newImages[i]);
					setStore({ sportCenterImages: newImages });
					// localStorage.setItem("sportCenterImages", JSON.stringify(sportCenter));
				}
			}
		}
	};
};

export default getState;
