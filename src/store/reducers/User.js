const initialState = {
    authToken: null,
    user: null,
    showLoader: false
}

const login = (state, payLoad) => {
    const newState = { ...state }
    const { user, authToken } = payLoad
    if (user.password) delete user.password
    if (user.refresh_token) delete user.refresh_token
    newState.user = user
    newState.authToken = authToken
    newState.showLoader = false
    return newState
}

const signup = (state, payLoad) => {
    const newState = { ...state }
    const { user, authToken } = payLoad
    newState.user = user
    newState.authToken = authToken
    newState.showLoader = false
    return newState
}

const logout = (state) => {
    return {
        authToken: null,
        user: null,
        showLoader: false
    }
}

const showLoader = (state) => {
    const newState = { ...state }
    newState.showLoader = true
    return newState
}

const unshowLoader = (state) => {
    const newState = { ...state }
    newState.showLoader = false
    return newState
}

const removeAuthToken = (state) => {
    const newState = { ...state }
    newState.authToken = null
    return newState
}

const setAuthToken = (state, payLoad) => {
    const newState = { ...state }
    newState.authToken = payLoad
    return newState
}

const setUserData = (state, payLoad) => {
    const newState = { ...state }
    newState.showLoader = false
    newState.user = payLoad
    return newState
}

const unsetUserData = (state, payLoad) => {
    const newState = { ...state }
    newState.showLoader = false
    newState.user = null
    return newState
}

const AuthenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return login(state, action.payLoad)
        case 'SIGNUP':
            return signup(state, action.payLoad)
        case 'LOGOUT':
            return logout(state)
        case 'SHOWLOADER':
            return showLoader(state)
        case 'UNSHOWLOADER':
            return unshowLoader(state)
        case 'REMOVE_AUTH_TOKEN':
            return removeAuthToken(state)
        case 'SET_AUTH_TOKEN':
            return setAuthToken(state, action.payLoad)
        case 'SET_USER_DATA':
            return setUserData(state, action.payLoad)
        case 'UNSET_USER_DATA':
            return unsetUserData(state, action.payLoad)
        default:
            return state
    }
}

export default AuthenticationReducer
