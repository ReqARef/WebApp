const initialState = {
	userList: []
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'GETUSERDATA':
		return {
			...state,
			userList: action.userData
		}
	default:
		return state
	}
}

export default userReducer
