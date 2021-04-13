const initialState = {
	requestTo : "",
	requests : []
};

const popupReducer = ( state=initialState, action) => {
	switch(action.type){
		case "SETREQUESTTO":
			return {
				...state,
				requestTo : action.email
			}
		case "SENDREQUEST":
			return state;
			case "GETREQUEST":
				return {
					...state,
					requests : action.request
				};
		default: 
			return state;	
	}
}

export default popupReducer;