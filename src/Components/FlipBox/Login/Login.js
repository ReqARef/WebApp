import React, { PureComponent } from 'react';
import styles from "./Login.module.css";
import { authScreenParagraph } from '../../../utils/constants';
import colors from '../../../utils/colors';
import { connect } from 'react-redux';
import { loginAsync } from '../../../store/actions/login';
import Loader from '../../Loader/Loader'

class Login extends PureComponent {
	constructor() {
		super()
		this.state = {
			email: '',
			password: ''
		}
	}

	handleemail = (e) => {
		this.setState({ email: e.target.value })
	}

	handlePassword = (e) => {
		this.setState({ password: e.target.value })
	}

	renderViewChangingButton = () => {
		return (
			<div>
				<button onClick={this.props.handleFlip}
					className={styles.button}
					style={{
						backgroundColor: colors.dark,
						borderColor: colors.white,
						color: colors.white
					}}>
					To SignUp
				</button>
			</div>
		)
	}

	renderViewChangingButtonHidden = () => {
		return (
			<button onClick={this.props.handleFlip}
				className={styles.buttonTemp}
				style={{
					backgroundColor: colors.white,
					color: colors.dark
				}}>
				To SignUp
			</button>
		)
	}

	renderLeftDiv = () => {
		return (
			<div className={styles.containerLeft} style={{ backgroundColor: colors.dark, color: colors.white }}>
				<h2 className={styles.leftHeading}>Welcome to ReqARef</h2>
				<p className={styles.leftPara}>{authScreenParagraph}</p>
				<div className={styles.buttonContainer}>
					{this.renderViewChangingButton()}
				</div>
			</div>
		)
	}

	handleLogin = (e) => {
		e.preventDefault()
		const { email, password } = this.state;
		if (email === '' || password === '') {
			alert('Email or Password empty');
			return;
		}
		const { sendLoginReq } = this.props;
		sendLoginReq(this.state.email, this.state.password);
	}

	renderLoader = () => {			
		return(
				<Loader/>
			)
	}
	renderSubmitButton = () => {
		return(
			<div
				onClick={this.handleLogin}
				className={styles.submitButton}
				style={{ backgroundColor: colors.dark, color: colors.white }}
			>{this.props.showLoader ? this.renderLoader() : "Login"}</div>
		)
	}

	renderForm = () => {
		return (
			<form onSubmit={this.handleLogin} className={styles.form}>
				<input
					className={styles.inputText}
					type="text"
					placeholder="Enter Email"
					value={this.state.email}
					onChange={this.handleemail}
					style={{ backgroundColor: colors.white, color: colors.dark }}
				/>
				<input
					className={styles.inputText}
					type="password"
					placeholder="Enter Password"
					value={this.state.password}
					onChange={this.handlePassword}
					style={{ backgroundColor: colors.white, color: colors.dark }}
				/>
				{this.renderSubmitButton()}
			</form>
		)
	}

	renderRightDiv = () => {
		return (
			<div className={styles.containerRight} style={{ backgroundColor: colors.white }}>
				<h1 className={styles.rightHeader} style={{ color: colors.dark }}>Log In</h1>
				{this.renderForm()}
				{this.renderViewChangingButtonHidden()}
			</div>
		)
	}

	renderWholeCard = () => {
		return (
			<div>
				{this.renderLeftDiv()}
				{this.renderRightDiv()}
			</div>
		)
	}

	renderWelcomeScreen = () => {
		return (
			<div style={{ backgroundColor: colors.dark, height: 500, width: 500 }}>
				<h1> Welcome Bro </h1>
			</div>
		);
	}

	render() {
		const { authToken } = this.props;
		return (
			<div className={styles.containerMain} >
				{authToken ? this.renderWelcomeScreen() : this.renderWholeCard()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		...state.Auth
	};
};

function mapDispatchToProps(dispatch) {
	return {
		sendLoginReq: (username, password) => {
			return dispatch(loginAsync(username, password));
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Login);