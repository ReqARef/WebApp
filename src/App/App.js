import './App.css';
import { Switch,Route} from 'react-router-dom'
import Aux from '../Hoc/Auxiliary';
import Authentication from '../Containers/Authentication/Authentication'
import { Component } from 'react';
import MyProfile from '../Containers/MyProfile/MyProfileContainer';

class App extends Component{
	render(){
		return (
			<div>
				<Aux>
					<Switch>
						<Route path="/myprofile" component={MyProfile}></Route>
						<Route path="/" component={Authentication}></Route>
					</Switch>	
				</Aux>
			</div>
		  );
	}
}

export default App;
