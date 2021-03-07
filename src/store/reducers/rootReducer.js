import {combineReducers} from 'redux';
import Auth from './Auth';
import Company from './Company';
import requestReducer from './requestReducer'; 
import userReducer from './UserSearchResult';
import Search from './SearchReducer';

export default combineReducers({
	Auth,
	requestReducer,
	Company,
	userReducer,
	Search
});