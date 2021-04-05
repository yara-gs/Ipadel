export async function myFetch(baseURL, path, method = "GET") {
	return fetch(baseURL + path, {
		method: method,
		headers: { "Content-Type": "application/json" }
	}).then(response => response.json());
}
