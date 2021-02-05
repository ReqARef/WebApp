const initialState ={
	isLoggedIn: false,
	authToken: null,
	refreshToken: null,
	user: null
};

const login = (state, payLoad) => {
	const newState = {...state};
	newState.isLoggedIn = true;
	const {user, authToken, refreshToken} = payLoad;
	newState.user = user;
	newState.authToken = authToken;
	newState.refreshToken = refreshToken;
	return newState;
}

const signup = (state, payLoad) => {
	const newState = {...state};
	newState.isLoggedIn = true;
	const {user, authToken, refreshToken} = payLoad;
	newState.user = user;
	newState.authToken = authToken;
	newState.refreshToken = refreshToken;
	return newState;
}

const logout = (state) => {
	return {
		isLoggedIn: false,
		authToken: null,
		refreshToken: null,
		user: null
	};
}

const AuthenticationReducer = (state = initialState, action) => {
	switch(action.type){
		case 'LOGIN':
			return login(state, action.payLoad);
		case 'SIGNUP':
				return signup(state, action.payLoad);
		case 'LOGOUT':
			return logout(state);
		default:
			return state
	}
}

export default AuthenticationReducer;