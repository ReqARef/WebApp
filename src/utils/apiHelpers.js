import { server } from './constants'
import { setAuthToken, logout } from '../store/actions/User'

export function checkForGeneralErrors (status, dispatch) {
	if (status === 401) {
		dispatch(logout())
	}
	return null
}

export function updateAuthToken (json, dispatch) {
	if (json && json.status && json.authToken) { dispatch(setAuthToken(json.authToken)) }
}

export function getRequest (path, resolve, reject, extraHeaders = {}, dispatch, changeAuthToken = true) {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		...extraHeaders
	}
	extraHeaders = extraHeaders || {}
	path = path[0] === '/' ? path.substring(1) : path
	return fetch(server.concat(`/${path}`), {
		method: 'GET',
		credentials: 'include',
		headers
	})
		.then((response) => {
			checkForGeneralErrors(response.status, dispatch)
			return response.json()
		})
		.then((json) => {
			if (changeAuthToken) {
				updateAuthToken(json, dispatch)
			}
			console.log(json)
			return resolve(json)
		})
		.catch((e) => {
			console.log(e)
			return reject(e)
		})
}

export function postRequest (path, resolve, reject, body, extraHeaders = {}, dispatch, changeAuthToken = true) {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		...extraHeaders
	}
	console.log(headers);
	extraHeaders = extraHeaders || {}
	path = path[0] === '/' ? path.substring(1) : path
	console.log(body);
	return fetch(server.concat(`/${path}`), {
		method: 'POST',
		credentials: 'include',
		headers,
		body: JSON.stringify({
			...body
		})
	})
		.then((response) => {
			checkForGeneralErrors(response.status, dispatch)
			return response.json()
		})
		.then((json) => {
			if (changeAuthToken) {
				updateAuthToken(json, dispatch)
			}
			return resolve(json)
		})
		.catch((e) => {
			console.log(e)
			return reject(e)
		})
}

export function putRequest (path, resolve, reject, body, extraHeaders = {}, dispatch, changeAuthToken = true) {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		...extraHeaders
	}
	extraHeaders = extraHeaders || {}
	path = path[0] === '/' ? path.substring(1) : path

	return fetch(server.concat(`/${path}`), {
		method: 'PUT',
		credentials: 'include',
		headers,
		body: JSON.stringify({
			...body
		})
	})
		.then((response) => {
			checkForGeneralErrors(response.status, dispatch)
			return response.json()
		})
		.then((json) => {
			if (changeAuthToken) {
				updateAuthToken(json, dispatch)
			}
			return resolve(json)
		})
		.catch((e) => {
			return reject(e)
		})
}
