import {postRequest} from '../../utils/apiHelpers';

export function login(payLoad) {
  return {
    type: 'LOGIN',
    payLoad,
  };
}

export function signup(payLoad) {
	return {
	  type: 'SIGNUP',
	  payLoad,
	};
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function showLoader(){
	return {
		type :'SHOWLOADER'
	};
}

export function setAuthToken(payLoad){
	return {
		type :'SET_AUTH_TOKEN',
		payLoad
	};
}

export function loginAsync(email, password) {
  return function(dispatch) {
	  dispatch(showLoader());
	  const resolve = (json) => {
        if (!json.status) {
          throw new Error(json.error);
        }
        return dispatch(login(json));
      }
	  const reject = (e) => {
	  	return dispatch(logout());
	  }
	  const body = {email, password};
	  return postRequest('login', resolve, reject, body, {}, dispatch, false)
  };
}

export function signupAsync(firstName, lastName, email, password, role) {
  return function(dispatch) {
	const resolve = (json) => {
        if (!json.status) {
			throw new Error(json.err);
		}
		return dispatch(signup(json));
	}
	const reject = (e) => {
	return dispatch(logout());
	}
	const body = {
		firstName,
		lastName,
		email,
		password,
		role
	};
	return postRequest('signup', resolve, reject, body, {}, dispatch, false)
  };
}

// export function authenticateToken(token) {
// 	return function(dispatch) {
// 	  const resolve = (json) => {
		  
// 	  }
// 	  const reject = (e) => {
		
// 	  }
// 	  const auth = 'Bearer '.concat(token);
// 	  const headers = {'Authorization': auth}

// 	  return postRequest('verifyToken', resolve, reject, {}, headers, dispatch, false)
// 	};
// }