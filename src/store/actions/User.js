import {
    getRequest,
    postRequest,
    putRequest,
    formDataPostRequest
} from '../../utils/apiHelpers'

export function login(payLoad) {
    return {
        type: 'LOGIN',
        payLoad
    }
}

export function signup(payLoad) {
    return {
        type: 'SIGNUP',
        payLoad
    }
}

export function logout() {
    return {
        type: 'LOGOUT'
    }
}

export function showLoader() {
    return {
        type: 'SHOWLOADER'
    }
}

export function unshowLoader() {
    return {
        type: 'UNSHOWLOADER'
    }
}

export function setAuthToken(payLoad) {
    return {
        type: 'SET_AUTH_TOKEN',
        payLoad
    }
}

export function setUserData(payLoad) {
    return {
        type: 'SET_USER_DATA',
        payLoad
    }
}

export function unsetUserData(payLoad) {
    return {
        true: 'UNSET_USER_DATA',
        payLoad
    }
}

export function loginAsync(email, password, callback) {
    return function (dispatch) {
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            callback()
            return dispatch(login(json))
        }
        const reject = (e) => {
            callback()
            alert('Invalid credentials')
            return dispatch(logout())
        }
        const body = { email, password }
        return postRequest('login', resolve, reject, body, {}, dispatch, false)
    }
}

export function signupAsync(
    firstName,
    lastName,
    email,
    password,
    role,
    callback
) {
    return function (dispatch) {
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            callback()
            return dispatch(signup(json))
        }
        const reject = (e) => {
            callback()
            alert(e)
            return dispatch(logout())
        }
        const body = {
            firstName,
            lastName,
            email,
            password,
            role
        }
        return postRequest('signup', resolve, reject, body, {}, dispatch, false)
    }
}

export function updateUserData(token, body, callback) {
    return function (dispatch) {
        const auth = 'Bearer '.concat(token)
        const headers = { Authorization: auth }
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            callback()
            return dispatch(setUserData(json.user))
        }
        const reject = (e) => {
            callback()
            alert('Update failed\n' + e)
        }
        return putRequest(
            'user/profile',
            resolve,
            reject,
            body,
            headers,
            dispatch,
            false
        )
    }
}

export function getUserData(token, callback) {
    return function (dispatch) {
        const auth = 'Bearer '.concat(token)
        const headers = { Authorization: auth }
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            callback()
            return dispatch(setUserData(json.user))
        }
        const reject = (e) => {
            callback()
            alert('Unable to fetch latest user data\n' + e)
        }
        return getRequest(
            'user/profile',
            resolve,
            reject,
            headers,
            dispatch,
            false
        )
    }
}

export function sendOTP(email, successCallback, errorCallback) {
    return function (dispatch) {
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            successCallback()
        }
        const reject = (e) => {
            errorCallback()
            alert(e)
        }
        const body = {
            email
        }
        return postRequest(
            'resetPassword',
            resolve,
            reject,
            body,
            {},
            dispatch,
            false
        )
    }
}

export function sendEmailOTP(token, callback) {
    return function (dispatch) {
        const auth = 'Bearer '.concat(token)
        const headers = { Authorization: auth }
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            callback()
        }
        const reject = (e) => {
            alert('Error sending OTP')
        }
        return postRequest(
            '/email/otp',
            resolve,
            reject,
            {},
            headers,
            dispatch,
            true
        )
    }
}

export function verifyEmailOTP(token, OTP, callback, errorCallback) {
    return function (dispatch) {
        const auth = 'Bearer '.concat(token)
        const headers = { Authorization: auth }
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            callback()
            return dispatch(setUserData(json.user))
        }
        const reject = (e) => {
            alert(e)
            errorCallback()
        }
        const body = {
            OTP
        }
        return postRequest(
            '/verify/email',
            resolve,
            reject,
            body,
            headers,
            dispatch,
            false
        )
    }
}

export function verifyOTP(email, OTP, successCallback, errorCallback) {
    return function (dispatch) {
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            successCallback()
        }
        const reject = (e) => {
            errorCallback()
            alert(e)
        }
        const body = {
            email,
            OTP
        }
        return postRequest(
            'verifyOTP',
            resolve,
            reject,
            body,
            {},
            dispatch,
            true
        )
    }
}

export function changePassword(email, password, callback) {
    return function (dispatch) {
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            callback()
            return dispatch(login(json))
        }
        const reject = (e) => {
            callback()
            alert('Something went wrong')
        }
        const body = {
            email,
            password
        }
        return postRequest(
            'updatePassword',
            resolve,
            reject,
            body,
            {},
            dispatch,
            false
        )
    }
}

export function changeAvatar(token, img, callback) {
    return function (dispatch) {
        const auth = 'Bearer '.concat(token)
        const headers = { Authorization: auth }
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            callback()
            return dispatch(setUserData(json.user))
        }
        const reject = (e) => {
            callback()
            alert('Something went wrong')
        }
        const body = img
        return formDataPostRequest(
            '/user/avatar',
            resolve,
            reject,
            body,
            headers,
            dispatch,
            false
        )
    }
}
