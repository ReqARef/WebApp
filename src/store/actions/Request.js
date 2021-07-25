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
        payload: payload.requests,
        totalPageCount: payload.totalPageCount
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
    showLoader
) {
    const auth = 'Bearer '.concat(token)
    const headers = { Authorization: auth }
    return function (dispatch) {
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            showLoader(false)
            return dispatch(sendRequest())
        }
        const reject = (e) => {
            alert('Something went wrong')
            showLoader(false)
        }

        const body = { jobId, jobUrl, comments, requestTo, companyName }
        postRequest('request', resolve, reject, body, headers, dispatch, true)
    }
}

export function getRequestListAsync(token, page, type, callback) {
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
            alert('Something went wrong ' + e)
        }
        return getRequest(
            `/request/${page}/${type}`,
            resolve,
            reject,
            headers,
            dispatch,
            true
        )
    }
}

export function handleRequestAsync(
    token,
    page,
    requestId,
    action,
    unshowLoader
) {
    const auth = 'Bearer '.concat(token)
    const headers = { Authorization: auth }
    return function (dispatch) {
        dispatch(showLoader(true))
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            unshowLoader()
            return dispatch(getRequests(json))
        }
        const reject = (e) => {
            unshowLoader()
            alert('Something went wrong')
        }

        const body = { requestId, action, page }
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
