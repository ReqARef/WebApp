import React,  {PureComponent} from 'react';
import styles from "./Login.module.css";
import {authScreenParagraph} from '../../../utils/constants';
import colors from '../../../utils/colors';

class Login extends PureComponent {
	constructor() {
		super()
		this.state = {
			email: '',
			password: ''
		}
	}

	handleemail = (e) => {
		this.setState({email: e.target.value})
	}

	handlePassword = (e) => {
		this.setState({password: e.target.value})
	}

	renderViewChangingButton = () => {
		return(
			<button onClick={this.props.handleFlip}
				className={styles.button} 
				style={{
						backgroundColor: colors.dark, 
						borderColor: colors.white, 
						color: colors.white
						}}>
				To SignUp
			</button>
		)
	}

	renderLeftDiv = () => {
		return (
			<div className={styles.containerLeft} style={{backgroundColor: colors.dark, color: colors.white}}>
				<h2 className={styles.leftHeading}>Welcome to ReqARef</h2>
				<p className={styles.leftPara}>{authScreenParagraph}</p>
				<div className={styles.buttonContainer}>
					{this.renderViewChangingButton()}
				</div>
			</div>
		)
	}

	renderForm = () => {
		return (
			<form onSubmit={() => {}} className={styles.form}>
				<input
					className={styles.inputText}
					type="text"
					placeholder="Enter Email"
					value={this.state.email}
					onChange={this.handleemail}
					style={{backgroundColor: colors.white, color: colors.dark}}
				/>
				<input
					className={styles.inputText}
					type="password"
					placeholder="Enter Password"
					value={this.state.password}
					onChange={this.handlePassword}
					style={{backgroundColor: colors.white, color: colors.dark}}
				/>
				<input
					type="submit"
					className={styles.submitButton}
					style={{backgroundColor: colors.dark, color: colors.white}}
					value="Login"
				/>
			</form>
		)
	}

	renderRightDiv = () => {
		return (
			<div className={styles.containerRight} style={{backgroundColor: colors.white}}>
				<h1 className={styles.rightHeader} style={{color: colors.dark}}>Log In</h1>
				{this.renderForm()}
				{/* {this.renderViewChangingButton()} */}
			</div>
		)
	}

	render() {
		return(
			<div className={styles.containerMain} >
				{this.renderLeftDiv()}
				{this.renderRightDiv()}
			</div>
		)
	}
}

export default Login