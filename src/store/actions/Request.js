import {postRequest} from '../../utils/apiHelpers';

export function logout() {
	return {
	  type: 'LOGOUT',
	};
}

export function sendRequest(payLoad) {
	return {
		type: 'SENDREQUEST',
		payLoad,
	};
}

export function showLoader(){
	return {
		type :'SHOWLOADER'
	};
}

export function makeRequestASync(jobId, jobUrl, comments) {
	return function(dispatch) {
		dispatch(showLoader());
		const resolve = (json) => {
		  if (!json.status) {
			throw new Error(json.error);
		  }
		  return dispatch(sendRequest(json));
		}
		const reject = (e) => {
			return dispatch(logout());
		}
		const body = {jobId, jobUrl, comments};
		return postRequest('request', resolve, reject, body, {}, dispatch, false)
	};
  }