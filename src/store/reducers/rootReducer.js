import {combineReducers} from 'redux';
import Auth from './Auth';
import Popup from './PopupReducer';

export default combineReducers({
	Auth,
	Popup
});