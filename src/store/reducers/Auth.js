import Cookies from 'universal-cookie';
import Cryptr from 'cryptr';

const COOKIE_AGE = process.env.REACT_APP_COOKIE_AGE;
const cookies = new Cookies();
const cryptr = new Cryptr(process.env.REACT_APP_Cryptr_Secret);

const initialState ={
	isLoggedIn: false,
	authToken: null,
	user: null,
	showLoader : false
};

const login = (state, payLoad) => {
	const newState = {...state};
	newState.isLoggedIn = true;
	const {user, authToken, refreshToken} = payLoad;
	newState.user = user;
	newState.authToken = authToken;
	const encryptedRefreshToken = cryptr.encrypt(refreshToken)
	cookies.set('refreshToken', encryptedRefreshToken, { path: '/', maxAge: COOKIE_AGE });
	newState.showLoader = false;
	return newState;
}

const signup = (state, payLoad) => {
	const newState = {...state};
	newState.isLoggedIn = true;
	const {user, authToken, refreshToken} = payLoad;
	newState.user = user;
	newState.authToken = authToken;
	const encryptedRefreshToken = cryptr.encrypt(refreshToken)
	cookies.set('refreshToken', encryptedRefreshToken, { path: '/', maxAge: COOKIE_AGE });
	newState.showLoader = false;
	return newState;
}

const logout = (state) => {
	return {
		isLoggedIn: false,
		authToken: null,
		user: null,
		showLoader: false
	};
}

const showLoader = (state) => {
	const newState = {...state};
	newState.showLoader=true;
	return newState;
}

const removeAuthToken = (state) => {
	const newState = {...state};
	newState.authToken=null;
	return newState;
}

const setAuthToken = (state, payLoad) => {
	const newState = {...state};
	newState.authToken=payLoad;
	return newState;
}

const AuthenticationReducer = (state = initialState, action) => {
	switch(action.type){
		case 'LOGIN':
			return login(state, action.payLoad);
		case 'SIGNUP':
				return signup(state, action.payLoad);
		case 'LOGOUT':
			return logout(state);
		case 'SHOWLOADER':
			return showLoader(state);
		case 'REMOVE_AUTH_TOKEN':
			return removeAuthToken(state);
		case 'SET_AUTH_TOKEN':
			return setAuthToken(state, action.payLoad);
		default:
			return state
	}
}

export default AuthenticationReducer;