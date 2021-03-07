import {postRequest} from '../../utils/apiHelpers';

export function logout() {
	return {
	  type: 'LOGOUT',
	};
}

export function sendRequest() {
	return {
		type: 'SENDREQUEST'
	};
}

export function makeRequestAsync(jobId, jobUrl, comments, requestTo, companyName) {
	return function(dispatch) {
		const resolve = (json) => {
		  if (!json.status) {
			throw new Error(json.error);
		  }
		  return dispatch(sendRequest());
		}
		const reject = (e) => {
			return dispatch(logout());
		}
		const body = {jobId, jobUrl, comments, requestTo, companyName};
		return postRequest('request', resolve, reject, body, {}, dispatch, false)
	};
  }