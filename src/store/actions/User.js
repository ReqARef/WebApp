import {getRequest, postRequest, putRequest} from '../../utils/apiHelpers';

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

export function unshowLoader(){
	return {
		type :'UNSHOWLOADER'
	};
}

export function setAuthToken(payLoad){
	return {
		type :'SET_AUTH_TOKEN',
		payLoad
	};
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
	dispatch(showLoader());
	const resolve = (json) => {
        if (!json.status) {
			throw new Error(json.error);
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

export function updateUserData(token, body) {
	return function(dispatch) {
	  const auth = 'Bearer '.concat(token);
	  const headers = {'Authorization': auth}
	  const resolve = (json) => {
		  if (!json.status) {
			  throw new Error(json.error);
		  }
		  return dispatch(setUserData(json['user']));
	  }
	  const reject = (e) => {
		dispatch(unshowLoader());
		alert('Update failed\n' + e)
	  }
	//   const body = {firstName, lastName, companyName, companyPosition, college, 
	// 	experience, country, role, bio};
	  dispatch(showLoader());
	  return putRequest('user/profile', resolve, reject, body, headers, dispatch, true)
	};
}

export function getUserData(token) {
	return function(dispatch) {
	  const auth = 'Bearer '.concat(token);
	  const headers = {'Authorization': auth}
	  const resolve = (json) => {
		  if (!json.status) {
			  throw new Error(json.error);
		  }
		  return dispatch(setUserData(json['user']));
	  }
	  const reject = (e) => {
		dispatch(unshowLoader());
		alert('Unable to fetch latest user data\n' + e)
	  }
	  dispatch(showLoader());
	  return getRequest('user/profile', resolve, reject, headers, dispatch, true)
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