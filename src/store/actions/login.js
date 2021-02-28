import {server} from '../../utils/constants';

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

export function loginAsync(email, password) {
  return function(dispatch) {
	dispatch(showLoader());
    return fetch(server.concat('/login'), {
      method: 'POST',
	  credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (!json.status) {
          throw new Error(json.error);
        }
        return dispatch(login(json));
      })
      .catch((e) => {
        return dispatch(logout());
      });
  };
}

export function signupAsync(firstName, lastName, email, password, role) {
  return function(dispatch) {
    return fetch(server.concat('/signup'), {
      method: 'POST',
	  credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
		firstName,
		lastName,
		email,
		password,
		role
      })
    })
      .then(response => response.json())
      .then(json => {
        if (!json.status) {
          throw new Error(json.err);
        }
        return dispatch(signup(json));
      })
      .catch((e) => {
        return dispatch(logout());
      });
  };
}

// export function authenticateToken(token) {
//   const auth = 'Bearer '.concat(token);
//   return function(dispatch) {
//     dispatch({type: 'ATTEMPTING_LOGIN'});
//     return fetch(constants.server.concat('/users/me'), {
//       method: 'GET',
//       headers: {
//         // eslint-disable-next-line prettier/prettier
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         // eslint-disable-next-line prettier/prettier
//         'Authorization': auth,
//       },
//     })
//       .then(response => response.json())
//       .then(json => {
//         if (json.err) {
//           throw new Error(json.err);
//         }
//         const payLoad = {
//           username: json.username,
//           name: json.name,
//           friends: json.friends,
//           reqSent: json.reqSent,
//           reqReceived: json.reqReceived,
//           token: token,
//         };
//         return dispatch(login(payLoad));
//       })
//       .catch(err => {
//         Toast.show(JSON.stringify(err.message), Toast.SHORT);
//         return dispatch(logout());
//       });
//   };
// }