import './App.css';
import { Switch,Route} from 'react-router-dom'
import Aux from '../Hoc/Auxiliary';
import Authentication from '../Containers/Authentication/Authentication'
import RequestPage from '../Containers/RequestPage/RequestPage'
import { Component } from 'react';
import MyProfile from '../Containers/MyProfile/MyProfileContainer';
import CompanySearch from '../Containers/CompanySearch/CompanySearchContainer';
import CompanySearchResult from '../Containers/CompanySearchResult/CompanySearchResult'

class App extends Component{
	render(){
		return (
			<div>
				<Aux>
					<Switch>
						<Route exact path="/request" component={RequestPage}></Route>
						<Route exact path="/companysearch" component={CompanySearch} />
						<Route exact path="/myprofile" component={MyProfile} />
						<Route exact path="/searchresult" component={CompanySearchResult}></Route>
						<Route path="/" component={Authentication} />
					</Switch>	
				</Aux>
			</div>
		  );
	}
}

export default App;
