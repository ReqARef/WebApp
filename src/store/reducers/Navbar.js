const initialState = {
    selected: 'HOME'
}

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NAVBAR_SELECTION':
            return {
                selected: action.payload
            }

        default:
            return state
    }
}

export default navbarReducer
