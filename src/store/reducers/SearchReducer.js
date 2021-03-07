const initialState ={
	usersOfCompanySearch: [],
	usersOfCompanySearchDownloading: true
};

const downloadList = (state, payLoad) => {
	const newState = {...state};
	newState.usersOfCompanySearch=payLoad;
	newState.usersOfCompanySearchDownloading = false;
	return newState;
}

const showLoader = (state) => {
	const newState = {...state};
	newState.usersOfCompanySearchDownloading = true;
	return newState;
}

const unshowLoader = (state) => {
	const newState = {...state};
	newState.usersOfCompanySearchDownloading = false;
	return newState;
}

const Search = (state = initialState, action) => {
	switch(action.type){
		case 'DOWNLOAD_USERS_OF_COMPANY_SEARCH_LIST':
			return downloadList(state, action.payLoad);
		case 'SHOW_USERS_OF_COMPANY_SEARCH_LOADER':
			return showLoader(state);
		case 'UNSHOW_USERS_OF_COMPANY_SEARCH_LOADER':
			return unshowLoader(state);
		default:
			return state
	}
}

export default Search;