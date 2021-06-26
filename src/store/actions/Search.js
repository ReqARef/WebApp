import { getRequest } from '../../utils/apiHelpers'

export function downloadList (payLoad) {
	return {
		type: 'DOWNLOAD_USERS_OF_COMPANY_SEARCH_LIST',
		payLoad
	}
}

export function unshowLoader () {
	return {
		type: 'UNSHOW_USERS_OF_COMPANY_SEARCH_LOADER'
	}
}

export function getUsersOfCompanySearchList (token, companyName) {
	return function (dispatch) {
		const auth = 'Bearer '.concat(token)
		const headers = { Authorization: auth }
		const resolve = (json) => {
			if (!json.status) {
				throw new Error(json.error)
			}
			return dispatch(downloadList(json.data))
		}
		const reject = (e) => {
			return dispatch(unshowLoader())
		}
		return getRequest(('/search/users/company/' + companyName), resolve, reject, headers, dispatch, true)
	}
}
