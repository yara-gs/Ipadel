const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: "",
			user: null,
			localstorage: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			saveAccessToken: accessToken => {
				setStore({ accessToken: accessToken });

				// localStorage.setItem("accesstoken", accessToken);
			},
			saveUser(user) {
				setStore({ user: user });
				localStorage.setItem("user", user);
				localStorage.getItem("user");
			},
			getAccessToken: () => {
				let store = getStore();
				if (store.accessToken) {
					return store.accessToken;
				} else {
					// return localStorage.setItem("accesstoken", accessToken);
				}
			}
		}
	};
};

export default getState;
