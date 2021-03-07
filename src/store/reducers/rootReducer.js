import {combineReducers} from 'redux';
import Auth from './Auth';
import Company from './Company';
import requestReducer from './requestReducer';

export default combineReducers({
	Auth,
	requestReducer,
	Company
});