import './App.css';
import { Switch,Route} from 'react-router-dom'
import Aux from '../Hoc/Auxiliary';
import Authentication from '../Containers/Authentication/Authentication'
import RequestPage from '../Containers/RequestPage/RequestPage'
import { Component } from 'react';
class App extends Component{
	render(){
		return (
			<div>
				<Aux>
					<Switch>
						<Route exact path="/request" component={RequestPage}></Route>
						<Route path="/" component={Authentication}></Route>
					</Switch>	
				</Aux>
			</div>
		  );
	}
}

export default App;
