import { postRequest, getRequest } from '../../utils/apiHelpers'
import { unshowLoader } from './User'

export function logout() {
    return {
        type: 'LOGOUT'
    }
}

export function sendRequest() {
    return {
        type: 'SENDREQUEST'
    }
}

export function getRequests(payload) {
    return {
        type: 'GETREQUEST',
        request: payload.requests
    }
}

export function showLoader() {
    return {
        type: 'SHOWREQUESTLOADER'
    }
}

export function hideLoader() {
    return {
        type: 'HIDEREQUESTLOADER'
    }
}

export function handleRequest() {
    return {
        type: 'HANDLEREQUEST'
    }
}

export function makeRequestAsync(
    jobId,
    jobUrl,
    comments,
    requestTo,
    companyName,
    token,
    showModal
) {
    const auth = 'Bearer '.concat(token)
    const headers = { Authorization: auth }
    return function (dispatch) {
        dispatch(showLoader())
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            dispatch(unshowLoader())
            return dispatch(sendRequest())
        }
        const reject = (e) => {
            dispatch(unshowLoader())
            return dispatch(logout())
        }

        const body = { jobId, jobUrl, comments, requestTo, companyName }
        postRequest('request', resolve, reject, body, headers, dispatch, true)
        showModal(null)
        return dispatch(hideLoader())
    }
}

export function getRequestListAsync(token, callback) {
    const auth = 'Bearer '.concat(token)
    const headers = { Authorization: auth }
    return function (dispatch) {
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            callback()
            return dispatch(getRequests(json))
        }
        const reject = (e) => {
            callback()
            return dispatch(logout())
        }
        return getRequest('/request', resolve, reject, headers, dispatch, true)
    }
}

export function handleRequestAsync(token, requestId, action) {
    const auth = 'Bearer '.concat(token)
    const headers = { Authorization: auth }
    return function (dispatch) {
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            return dispatch(handleRequest())
        }
        const reject = (e) => {
            return dispatch(logout())
        }

        const body = { requestId, action }
        return postRequest(
            'handlerequest',
            resolve,
            reject,
            body,
            headers,
            dispatch,
            true
        )
    }
}
