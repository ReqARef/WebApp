import React,  {PureComponent} from 'react';
import styles from "./FlipBox.module.css";
import ReactCardFlip from 'react-card-flip';
import Login from './Login/Login'
import SignUp from './Signup/Signup'

class FlipBox extends PureComponent{
	constructor() {
		super();
		  this.state = {
		  isFlipped: false
		};
	}

	handleFlip = (e) => {
		e.preventDefault();
		this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
	}

	render(){
		return (
			<div className={styles.main}>
				<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
					<Login handleFlip={this.handleFlip} isFlipped={this.state.isFlipped} />
					<SignUp handleFlip={this.handleFlip} isFlipped={this.state.isFlipped} />
				</ReactCardFlip>
			</div>
		);
	}
}

export default FlipBox;