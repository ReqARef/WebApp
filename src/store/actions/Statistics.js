import { getRequest } from '../../utils/apiHelpers'

export function logout() {
    return {
        type: 'LOGOUT'
    }
}

function getStats(json) {
    return {
        type: 'SETSTATS',
        response: json
    }
}

export function getUserStats(token, callback) {
    const auth = 'Bearer '.concat(token)
    const headers = { Authorization: auth }
    return function (dispatch) {
        const resolve = (json) => {
            if (!json.status) {
                throw new Error(json.error)
            }
            callback()
            return dispatch(getStats(json))
        }
        const reject = (e) => {
            callback()
            alert('Something went wrong')
        }
        return getRequest('/stats', resolve, reject, headers, dispatch, true)
    }
}
