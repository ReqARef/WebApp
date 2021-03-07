import {postRequest} from '../../utils/apiHelpers';

export function setCompanyList(payLoad) {
	return {
	  type: 'DOWNLOAD_COMPANY_LIST',
	  payLoad,
	};
}

export function unshowLoader() {
	return {
		type: 'UNSHOW_COMPANY_LOADER'
	};
}

export function getCompaniesList(token) {
	return function(dispatch) {
		const auth = 'Bearer '.concat(token);
		const headers = {'Authorization': auth}
		const resolve = (json) => {
		  if (!json.status) {
			throw new Error(json.error);
		  }
		  return dispatch(setCompanyList(json.data));
		}
		const reject = (e) => {
			return dispatch(unshowLoader());
		}
		return postRequest('companies/list', resolve, reject, {}, headers, dispatch, true)
	};
  }


