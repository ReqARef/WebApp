import './App.css'
import { Switch, Route } from 'react-router-dom'
import Aux from '../Hoc/Auxiliary'
import { connect } from 'react-redux'
import Authentication from '../Containers/Authentication/Authentication'
import RequestPage from '../Containers/RequestPage/RequestPage'
import React, { PureComponent } from 'react'
import MyProfile from '../Containers/MyProfile/MyProfileContainer'
import CompanySearch from '../Containers/CompanySearch/CompanySearchContainer'
import CompanySearchResult from '../Containers/CompanySearchResult/CompanySearchResult'
import Homepage from '../Containers/Homepage/Homepage'
import Navbar from '../Containers/Navbar/Navbar'
import ResetPassword from '../Containers/ResetPassword/ResetPassword'

class App extends PureComponent {
    redirectToLoginPage = () => {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/home" component={Homepage} />
                    <Route
                        exact
                        path="/resetPassword"
                        component={ResetPassword}
                    />
                    <Route path="/" component={Authentication} />
                </Switch>
            </div>
        )
    }

    redirectToRequestedPage = () => {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route
                        exact
                        path="/request"
                        component={RequestPage}
                    ></Route>
                    <Route
                        exact
                        path="/companysearch"
                        component={CompanySearch}
                    />
                    <Route exact path="/myprofile" component={MyProfile} />
                    <Route
                        exact
                        path="/searchresult"
                        component={CompanySearchResult}
                    ></Route>
                    <Route path="/" component={Homepage} />
                </Switch>
            </div>
        )
    }

    render() {
        const hasAuthToken = this.props.authToken
        return (
            <div>
                <Aux>
                    {hasAuthToken && this.redirectToRequestedPage()}
                    {!hasAuthToken && this.redirectToLoginPage()}
                </Aux>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authToken: state.User.authToken
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeAuthToken: () => {
            return dispatch({ type: 'REMOVE_AUTH_TOKEN' })
        },
        setAuthToken: (token) =>
            dispatch({ type: 'SET_AUTH_TOKEN', payLoad: token })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
