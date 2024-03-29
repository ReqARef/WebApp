import { server } from './constants'
import { setAuthToken, logout } from '../store/actions/User'

export function checkForGeneralErrors(status, dispatch) {
    if (status === 401) {
        dispatch(logout())
    }
    return null
}

export function updateAuthToken(json, dispatch) {
    if (json && json.status && json.authToken) {
        dispatch(setAuthToken(json.authToken))
    }
}

export function getRequest(
    path,
    resolve,
    reject,
    extraHeaders = {},
    dispatch,
    changeAuthToken = true
) {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...extraHeaders
    }
    extraHeaders = extraHeaders || {}
    path = path[0] === '/' ? path.substring(1) : path

    if (!navigator.onLine) {
        return alert('You are not connected to internet')
    }
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
            return resolve(json)
        })
        .catch((e) => {
            if (e.toString() === 'TypeError: Failed to fetch') return
            return reject(e)
        })
}

export function postRequest(
    path,
    resolve,
    reject,
    body,
    extraHeaders = {},
    dispatch,
    changeAuthToken = true
) {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...extraHeaders
    }
    extraHeaders = extraHeaders || {}
    path = path[0] === '/' ? path.substring(1) : path

    if (!navigator.onLine) {
        return alert('You are not connected to internet')
    }

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
            if (e.toString() === 'TypeError: Failed to fetch') return
            return reject(e)
        })
}

export function putRequest(
    path,
    resolve,
    reject,
    body,
    extraHeaders = {},
    dispatch,
    changeAuthToken = true
) {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...extraHeaders
    }
    extraHeaders = extraHeaders || {}
    path = path[0] === '/' ? path.substring(1) : path

    if (!navigator.onLine) {
        return alert('You are not connected to internet')
    }

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
            if (e.toString() === 'TypeError: Failed to fetch') return
            return reject(e)
        })
}

export function formDataPostRequest(
    path,
    resolve,
    reject,
    body,
    extraHeaders = {},
    dispatch,
    changeAuthToken = true
) {
    const headers = {
        ...extraHeaders
    }
    extraHeaders = extraHeaders || {}
    path = path[0] === '/' ? path.substring(1) : path

    if (!navigator.onLine) {
        return alert('You are not connected to internet')
    }

    return fetch(server.concat(`/${path}`), {
        method: 'POST',
        credentials: 'include',
        headers,
        body
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
            if (e.toString() === 'TypeError: Failed to fetch') return
            return reject(e)
        })
}
