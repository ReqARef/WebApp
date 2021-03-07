import {combineReducers} from 'redux';
import Auth from './Auth';
import requestReducer from './requestReducer';

export default combineReducers({
	Auth,
	requestReducer
});