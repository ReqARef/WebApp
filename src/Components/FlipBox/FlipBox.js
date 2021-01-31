import React,  {PureComponent} from 'react';
import styles from "./FlipBox.module.css";
import ReactCardFlip from 'react-card-flip';

class FlipBox extends PureComponent{
	constructor() {
		super();
		  this.state = {
		  isFlipped: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (e) => {
		e.preventDefault();
		this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
	}

	loginScreen = () => {
		return (
			<div className={styles.containerMain}>
				<div className={styles.containerLeft}>Login</div>
				<div className={styles.containerRight}></div>
			</div>
		)
	}

	signupScreen = () => {
		return (
			<div className={styles.containerMain}>
				<div className={styles.containerLeft}>Signup</div>
				<div className={styles.containerRight}></div>
			</div>
		)
	}

	renderViewChangingButton = () => {
		const text = this.state.isFlipped ? 'To Login' : 'To SignUp'
		return(
			<button onClick={this.handleClick} className={styles.button}>
				{text}
			</button>
		)
	}

	render(){
		return (
			<div className={styles.main}>
				{this.renderViewChangingButton()}
				<ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
					{this.loginScreen()}
					{this.signupScreen()}
				</ReactCardFlip>
			</div>
		);
	}
}

export default FlipBox;