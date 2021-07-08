const initialState = {
	requestTo: '',
	requests: [],
	showLoader: false,
	showPopUp: false
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
		return {
			...state,
			requests: action.request
		}
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
