import {combineReducers} from 'redux';
import Auth from './Auth';
import Company from './Company';
import requestReducer from './requestReducer'; 
import userReducer from './UserSearchResult';

export default combineReducers({
	Auth,
	requestReducer,
	Company,
	userReducer
});