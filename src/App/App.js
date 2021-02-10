import './App.css';
import { Switch,Route} from 'react-router-dom'
import Aux from '../Hoc/Auxiliary';
import Authentication from '../Containers/Authentication/Authentication'
import { Component } from 'react';
import MyProfile from '../Containers/MyProfile/MyProfileContainer';
import CompanySearch from '../Containers/CompanySearch/CompanySearchContainer';

class App extends Component{
	render(){
		return (
			<div>
				<Aux>
					<Switch>
						<Route path="/companysearch" component={CompanySearch} />
						<Route path="/myprofile" component={MyProfile} />
						<Route path="/" component={Authentication} />
					</Switch>	
				</Aux>
			</div>
		  );
	}
}

export default App;
