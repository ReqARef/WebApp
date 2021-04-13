import React, { PureComponent } from 'react';
import styles from "./Password.module.css";
import { authScreenParagraph } from '../../../utils/constants';
import colors from '../../../utils/colors';
import { connect } from 'react-redux';
import { changePassword } from '../../../store/actions/User';
import Loader from '../../Loader/Loader'
import { withRouter } from 'react-router-dom'

class Password extends PureComponent {
	constructor() {
		super()
		this.state = {
			password1: '',
			password2: ''
		}
	}

	handlePassword1 = (e) => {
		this.setState({ password1: e.target.value })
	}

	handlePassword2 = (e) => {
		this.setState({ password2: e.target.value })
	}

	renderLeftDiv = () => {
		return (
			<div className={styles.containerLeft} style={{ backgroundColor: colors.dark, color: colors.white }}>
				<h2 className={styles.leftHeading}>Welcome to ReqARef</h2>
				<p className={styles.leftPara}>{authScreenParagraph}</p> 
			</div>
		)
	}

	handleLogin = (e) => {
		e.preventDefault()
		const { password1, password2 } = this.state;
		const {email} = this.props;
		if (password1 === '' || password2 === '') {
			alert('Password empty');
			return;
		}
		if(password1 !== password2) {
			alert('Password mismatch');
			return;
		}
		const { changePassword } = this.props;
		changePassword(email, password1);
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
			>{this.props.showLoader ? this.renderLoader() : "Reset"}</div>
		)
	}

	renderForm = () => {
		return (
			<form onSubmit={this.handleLogin} className={styles.form}>
				<input
					className={styles.inputText}
					type="password"
					placeholder="Enter Password"
					value={this.state.email}
					onChange={this.handlePassword1}
					style={{ backgroundColor: colors.white, color: colors.dark }}
				/>
				<input
					className={styles.inputText}
					type="password"
					placeholder="Re Enter Password"
					value={this.state.password}
					onChange={this.handlePassword2}
					style={{ backgroundColor: colors.white, color: colors.dark }}
				/>
				{this.renderSubmitButton()}
			</form>
		)
	}

	renderRightDiv = () => {
		return (
			<div className={styles.containerRight} style={{ backgroundColor: colors.white }}>
				<h2 className={styles.rightHeader} style={{ color: colors.dark }}>Enter New Password</h2>
				{this.renderForm()}
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

	render() {
		const { authToken } = this.props;
		if(authToken) {
			this.props.history.push({
				pathname : '/'
			})
		}
		return (
			<div className={styles.containerMain} >
				{this.renderWholeCard()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		showLoader: state.User.showLoader
	};
};

function mapDispatchToProps(dispatch) {
	return {
		changePassword: (email, password) => {
			return dispatch(changePassword(email, password));
		}
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(Password));