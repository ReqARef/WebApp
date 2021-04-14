import React,  {PureComponent} from 'react';
import styles from "./ResetPassword.module.css";
import ReactCardFlip from 'react-card-flip';
import EmailAndOtp from './EmailAndOtp/EmailAndOtp'
import Password from './Password/Password'

class ResetPassword extends PureComponent{
	constructor() {
		super();
		  this.state = {
		  isFlipped: false,
		  email: ''
		};
	}

	handleFlip = (e) => {
		e.preventDefault();
		this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
	}

	setEmail = (email) => {
		this.setState({email})
	}

	render() {
		const {email} = this.state;
		return (
			<div className={styles.main}>
				<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
				<EmailAndOtp 
					handleFlip={this.handleFlip} 
					isFlipped={this.state.isFlipped} 
					setParentEmail={this.setEmail}/>
					<Password 
						email={email}
						handleFlip={this.handleFlip} 
						isFlipped={this.state.isFlipped} />
				</ReactCardFlip>
			</div>
		);
	}
}

export default ResetPassword;