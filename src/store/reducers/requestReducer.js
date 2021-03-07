const initialState = {
	requestTo : "",
	temp : ""
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
				...state,
				temp : action.email
			}
		default: 
			return state;	
	}
}

export default popupReducer;