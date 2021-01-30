import React, {Component} from 'react';
import styles from "./HomeScreenBoxLeftText.module.css";
class HomeScreenBoxLeftText extends Component {
		
	render(){

		let leftSideText = (
			<div className={styles.HomeScreenBoxLeftText}>
				<h1>Hey, There</h1>
				<p className ={styles.paraSpacing}>Enter your credentials</p>
				<p className ={styles.paraSpacing}>and start your journey with us</p>
			</div>
		)
		return (
			<div>
				{leftSideText}
			</div>
		);
	}
}
export default HomeScreenBoxLeftText; 