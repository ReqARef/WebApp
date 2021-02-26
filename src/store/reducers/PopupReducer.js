const initialState = {
	showPopup : false 
};

const popupReducer = ( state=initialState, action) => {
	switch(action.type){
		case "SHOWPOPUP":
			return {
				...state,
				showPopup : true
			}
		case "HIDEPOPUP":
			return {
				...state,
				showPopup : false
			}
		default: 
			return state;	
	}
}

export default popupReducer;