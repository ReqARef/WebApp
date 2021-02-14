const initialState ={
	isLoggedIn: false,
	authToken: null,
	refreshToken: null,
	user: null,
	showLoader : false
};

const login = (state, payLoad) => {
	const newState = {...state};
	newState.isLoggedIn = true;
	const {user, authToken, refreshToken} = payLoad;
	newState.user = user;
	newState.authToken = authToken;
	newState.refreshToken = refreshToken;
	newState.showLoader = false;
	return newState;
}

const signup = (state, payLoad) => {
	const newState = {...state};
	newState.isLoggedIn = true;
	const {user, authToken, refreshToken} = payLoad;
	newState.user = user;
	newState.authToken = authToken;
	newState.refreshToken = refreshToken;
	newState.showLoader = false;
	return newState;
}

const logout = (state) => {
	return {
		isLoggedIn: false,
		authToken: null,
		refreshToken: null,
		user: null,
		showLoader: false
	};
}

const showLoader = (state) => {
	const newState = {...state};
	newState.showLoader=true;
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
		default:
			return state
	}
}

export default AuthenticationReducer;