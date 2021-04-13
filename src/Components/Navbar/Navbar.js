import React, {PureComponent} from 'react';
import colors from '../../utils/colors';
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../store/actions/User';

class Navbar extends PureComponent {

	renderReqarefLogo = () => {
		return (
			<Link to="/" className={styles.link}>
				<div className={styles.logoContainer}>
					<div style={{color: colors.white}}>ReqARef</div>
				</div>
			</Link>
		)
	}

	renderButton = (text, link) => {
		return (
			<Link to={link} className={styles.link}>
				<div 
					className={styles.button} 
					style={{color: colors.white, borderColor: colors.white}} 
				>
					{text}
				</div>
			</Link>
		)
	}

	renderLogoutButton = () => {
		const {logoutAction} = this.props;
		return (
			<Link to={"/"} className={styles.link}>
				<div 
					className={styles.button} 
					style={{color: colors.white, borderColor: colors.white}}
					onClick={logoutAction}
				>
					Logout
				</div>
			</Link>
		)
	}

	renderNavLinksWhenLoggedIn = () => {
		return (
			<div className={styles.navlinks}>
				{this.renderLogoutButton()}
				{this.renderButton('My Profile', "/myprofile")}
				{this.renderButton('Search', "/companysearch")}
				{this.renderButton('Requests','/request')}
				{this.renderButton('Home',"/")}
			</div>
		)
	}

	renderNavLinksWhenNotLoggedIn = () => {
		return (
			<div className={styles.navlinks}>
				{this.renderButton('Login/Signup', "/auth")}
				{this.renderButton('Home',"/")}
			</div>
		)
	}

	render() {
		const {authToken} = this.props;
		return (
			<div className={styles.navbar} style={{backgroundColor: colors.dark}}>
				{this.renderReqarefLogo()}
				{authToken && this.renderNavLinksWhenLoggedIn()}
				{!authToken && this.renderNavLinksWhenNotLoggedIn()}
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		authToken: state.User.authToken
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logoutAction: () => dispatch(logout()) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)