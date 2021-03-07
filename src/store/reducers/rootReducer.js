import {combineReducers} from 'redux';
import Auth from './Auth';
import Popup from './PopupReducer';
import Company from './Company';

export default combineReducers({
	Auth,
	Popup,
	Company
});