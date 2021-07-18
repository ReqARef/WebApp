const initialState = {
    requestTo: '',
    requests: [],
    showLoader: false,
    showPopUp: false,
    totalPages: 1
}

const handleGetRequest = (state, payload, totalPageCount) => {
    const newState = { ...state }
    newState.requests = payload
    if (totalPageCount) {
        newState.totalPages = totalPageCount
    }
    return newState
}

const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SETREQUESTTO':
            return {
                ...state,
                showPopUp: true,
                requestTo: action.email
            }
        case 'SENDREQUEST':
            return state
        case 'GETREQUEST':
            return handleGetRequest(
                state,
                action.payload,
                action.totalPageCount
            )
        case 'SHOWREQUESTLOADER':
            return {
                ...state,
                showLoader: true
            }
        case 'HIDEREQUESTLOADER':
            return {
                ...state,
                showLoader: false
            }
        default:
            return state
    }
}

export default popupReducer
