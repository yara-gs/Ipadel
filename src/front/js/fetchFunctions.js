export async function myFetch(baseURL, path, method = "GET") {
	return fetch(baseURL + path, {
		method: method,
		headers: { "Content-Type": "application/json" }
	}).then(response => response.json());
}

export async function fetchFiles(endpoint, data) {
	await fetch(endpoint, {
		method: "POST",
		body: data
	})
		.then(response => {
			response.json();
			return response;
		})
		.then(success => console.log(success))
		.catch(error => console.log(error));
}
