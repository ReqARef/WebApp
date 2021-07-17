import { combineReducers } from 'redux'
import User from './User'
import Company from './Company'
import requestReducer from './requestReducer'
import userReducer from './UserSearchResult'
import Search from './SearchReducer'
import StatsReducer from './StatsReducer'
import NavbarReducer from './Navbar'

export default combineReducers({
    User,
    requestReducer,
    Company,
    userReducer,
    Search,
    StatsReducer,
    Navbar: NavbarReducer
})
