import React,  {PureComponent} from 'react';
import styles from "./Signup.module.css";
import {authScreenParagraph} from '../../../utils/constants';
import colors from '../../../utils/colors';

class Signup extends PureComponent {
	constructor() {
		super()
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			otp: '',
			showOtp: false
		}
	}

	handleFirstName = (e) => {
		this.setState({firstName: e.target.value})
	}

	handleLastName = (e) => {
		this.setState({lastName: e.target.value})
	}

	handleemail = (e) => {
		this.setState({email: e.target.value})
	}

	handlePassword = (e) => {
		this.setState({password: e.target.value})
	}

	handleOTP = (e) => {
		this.setState({otp: e.target.value})
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
				To Login
			</button>
		)
	}

	renderViewChangingButtonHidden = () => {
		return(
			<button onClick={this.props.handleFlip}
				className={styles.buttonTemp} 
				style={{
						backgroundColor: colors.dark, 
						color: colors.white
						}}>
				To Login
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
			<form onSubmit={(e) => {e.preventDefault(); this.setState({showOtp: true})}} className={styles.form}>
				<div className={styles.nameContainer}>
					<input
						className={styles.nameText}
						type="text"
						placeholder="First Name"
						value={this.state.firstName}
						onChange={this.handleFirstName}
						style={{backgroundColor: colors.white, color: colors.dark}}
					/>
					<div className={styles.nameSeparator} style={{backgroundColor: colors.white}}/>
					<input
						className={styles.nameText}
						type="text"
						placeholder="Last Name"
						value={this.state.lastName}
						onChange={this.handleLastName}
						style={{backgroundColor: colors.white, color: colors.dark}}
					/>
				</div>
				<input
					className={styles.inputText}
					type="text"
					placeholder="Email"
					value={this.state.email}
					onChange={this.handleemail}
					style={{backgroundColor: colors.white, color: colors.dark}}
				/>
				<input
					className={styles.inputText}
					type="password"
					placeholder="Password"
					value={this.state.password}
					onChange={this.handlePassword}
					style={{backgroundColor: colors.white, color: colors.dark}}
				/>
				{this.state.showOtp ? (
					<input
					className={styles.inputText}
					type="text"
					placeholder="OTP"
					value={this.state.otp}
					onChange={this.handleOTP}
					style={{backgroundColor: colors.white, color: colors.dark}}
				/>
				) : null}
				<input
					type="submit"
					className={styles.submitButton}
					style={{backgroundColor: colors.dark, color: colors.white}}
					value="Signup"
				/>
			</form>
		)
	}

	renderRightDiv = () => {
		return (
			<div className={styles.containerRight} style={{backgroundColor: colors.white}}>
				<h1 className={styles.rightHeader} style={{color: colors.dark}}>Sign Up</h1>
				{this.renderForm()}
				{this.renderViewChangingButtonHidden()}
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

export default Signup