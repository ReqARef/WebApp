import React, {PureComponent} from 'react';
import colors from '../../utils/colors';
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom';

export default class Navbar extends PureComponent {

	renderReqarefLogo = () => {
		return (
			<Link to="/" className={styles.link}>
				<div className={styles.logoContainer}>
					<text style={{color: colors.white}}>ReqARef</text>
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

	renderNavLinks = () => {
		return (
			<div className={styles.navlinks}>
				{this.renderButton('My Profile', "/myprofile")}
				{this.renderButton('Search', "/companysearch")}
				{this.renderButton('Requests','/request')}
				{this.renderButton('Home',"/")}
			</div>
		)
	}

	render(){
		return (
			<div className={styles.navbar} style={{backgroundColor: colors.dark}}>
				{this.renderReqarefLogo()}
				{this.renderNavLinks()}
			</div>
		);
	}
};