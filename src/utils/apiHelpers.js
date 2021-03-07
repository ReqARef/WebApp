import {server} from './constants';
import {setAuthToken, logout} from '../store/actions/Auth';

function checkForGeneralErrors(status, dispatch) {
	if(status === 401) {
		dispatch(logout())
	}
	return null;
}

function updateAuthToken(json, dispatch) {
	if(json && json['status'] && json['authToken'])
		dispatch(setAuthToken(json['authToken']));
}

export function postRequest(path, resolve, reject, body, extraHeaders={}, dispatch, changeAuthToken=true) {
	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		...extraHeaders
	}
	extraHeaders = extraHeaders || {}
	path = path[0] === '/' ? path.substring(1) : path;
	
	return fetch(server.concat(`/${path}`), {
		method: 'POST',
		credentials: 'include',
		headers,
		body: JSON.stringify({
		  ...body
		}),
	  })
		.then((response) => {
			checkForGeneralErrors(response.status, dispatch);
			return response.json()
		})
		.then((json) => {
			if(changeAuthToken) {
				updateAuthToken(json)
			}
			return resolve(json)
		})
		.catch((e) => {
		  return reject(e);
		});
}

export function getRequest(path, resolve, reject, params,extraHeaders={}, dispatch, changeAuthToken=true){
	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		...extraHeaders
	}
	extraHeaders = extraHeaders || {}
	path = path[0] === '/' ? path.substring(1) : path;
	for(var key in params){
		console.log(params[key]);
	}
	return fetch(server.concat(`/${path}`), {
		method: 'GET',
		credentials: 'include',
		headers,
		body:{}
	  })
		.then((response) => {
			checkForGeneralErrors(response.status, dispatch);
			return response.json()
		})
		.then((json) => {
			if(changeAuthToken) {
				updateAuthToken(json)
			}
			return resolve(json)
		})
		.catch((e) => {
		  return reject(e);
		});
}
