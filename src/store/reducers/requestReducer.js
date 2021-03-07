const initialState = {
	requestTo : "",
	company : ""
};

const popupReducer = ( state=initialState, action) => {
	switch(action.type){
		case "SETREQUESTTO":
			return {
				...state,
				requestTo : action.email
			}
		case "SENDREQUEST":
			return {
				...state
			}
		default: 
			return state;	
	}
}

export default popupReducer;