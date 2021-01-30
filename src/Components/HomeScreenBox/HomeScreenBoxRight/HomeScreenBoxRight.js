import React, {Component} from 'react';
import styles from "./HomeScreenBoxRight.module.css"
import HomeScreenBoxRightText from "./HomeScreenBoxRightText/HomeScreenBoxRightText";
import SignUpForm from "./SignUpForm/SignUpForm"
class HomeScreenBoxRight extends Component {
	render(){
		return(
			<div className={styles.HomeScreenBoxRight}>
				<HomeScreenBoxRightText/>
				<SignUpForm/>
			</div>
		)
	}
}
export default HomeScreenBoxRight;