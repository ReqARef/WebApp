import React, {Component} from 'react';

class SignUpForm extends Component{
	render(){
		return(
			<div>
				<input type="text" name="first name"></input>
				<input type="text" name="last name"></input>
				<input type="text" name="email"></input>
				<input type="password" name="password"></input>
			</div>
		)
	}
}

export default SignUpForm;