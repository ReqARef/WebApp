import './App.css';
import { Switch,Route} from 'react-router-dom'
import Aux from '../Hoc/Auxiliary';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';
import Cryptr from 'cryptr';
import Authentication from '../Containers/Authentication/Authentication'
import RequestPage from '../Containers/RequestPage/RequestPage'
import { PureComponent } from 'react';
import MyProfile from '../Containers/MyProfile/MyProfileContainer';
import CompanySearch from '../Containers/CompanySearch/CompanySearchContainer';
import CompanySearchResult from '../Containers/CompanySearchResult/CompanySearchResult'

class App extends PureComponent{
	
	componentWillMount = async () => {
		const {authToken} = this.props;
		if(!authToken || !this.verifyAuthToken()) {
			const generatedAuthToken = this.verifyRefreshTokenAndGenerateAuthToken()
			if(!generatedAuthToken) {
				this.props.removeAuthToken()
			}
		}
	}

	verifyAuthToken = () => {
		try {
			const {authToken} = this.props;
			jwt.verify(authToken, process.env.REACT_APP_access_jwt_secret);
			return true;
		} catch(e) {
			return false;
		}
	}

	verifyRefreshTokenAndGenerateAuthToken = () => {
		try {
			const cookies = new Cookies();
			const cryptr = new Cryptr(process.env.REACT_APP_Cryptr_Secret);
			const encodedRefreshToken = cookies.get('refreshToken');
			const refreshToken = cryptr.decrypt(encodedRefreshToken);
			const decoded = jwt.verify(refreshToken, process.env.REACT_APP_refresh_jwt_secret);
			const accessToken = jwt.sign(
				{email: decoded.email}, process.env.REACT_APP_access_jwt_secret, { expiresIn: process.env.REACT_APP_access_jwt_expiry}
			);
			this.props.setAuthToken(accessToken);
			return accessToken;
		} catch(e) {
			return false;
		}
	}

	renderLoader = () => {
		return (
			<div style={{backgroundColor: 'royalblue', height: '100vh', width: '100vw'}}></div>
		)
	}

	redirectToLoginPage = () => {
		return (
			<Switch>
				<Route path="/" component={Authentication} />
			</Switch>	
		)
	}

	redirectToRequestedPage = () => {
		return (
			<Switch>
				<Route exact path="/request" component={RequestPage}></Route>
				<Route exact path="/companysearch" component={CompanySearch} />
				<Route exact path="/myprofile" component={MyProfile} />
				<Route exact path="/searchresult" component={CompanySearchResult}></Route>
				<Route path="/" component={Authentication} />
			</Switch>	
		)
	}

	render(){
		const hasAuthToken = this.props.authToken;
		return (
			<div>
				<Aux>
					{hasAuthToken && this.redirectToRequestedPage()}
					{!hasAuthToken && this.redirectToLoginPage()}
				</Aux>
			</div>
		  );
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.Auth.authToken
	};
};

function mapDispatchToProps(dispatch) {
	return {
		removeAuthToken: () => {
			return dispatch({type: 'REMOVE_AUTH_TOKEN'});
		},
		setAuthToken: (token) => dispatch({type: 'SET_AUTH_TOKEN', payLoad: token})
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
