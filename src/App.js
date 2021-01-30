import './App.css';
import { Switch,Route} from 'react-router-dom'
import Aux from './Hoc/Auxiliary';
import HomeScreen from './Containers/HomeScreen/HomeScreen'
import { Component } from 'react';
class App extends Component{
	render(){
		return (
			<div>
				<Aux>
					<Switch>
						<Route path="/" component={HomeScreen}></Route>
					</Switch>	
				</Aux>
			</div>
		  );
	}
}

export default App;
