import { postRequest, getRequest } from '../../utils/apiHelpers'

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

export function makeRequestAsync(
    jobId,
    jobUrl,
    comments,
    requestTo,
    companyName,
    token
) {
    const auth = 'Bearer '.concat(token)
    const headers = { Authorization: auth }
    return function (dispatch) {
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            return dispatch(sendRequest())
        }
        const reject = (e) => {
            return dispatch(logout())
        }
        const body = { jobId, jobUrl, comments, requestTo, companyName }
        return postRequest(
            'request',
            resolve,
            reject,
            body,
            headers,
            dispatch,
            true
        )
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
