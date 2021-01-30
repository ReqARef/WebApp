import React, {Component} from 'react';
import styles from "./HomeScreenBoxLeftButton.module.css";
class HomeScreenBoxLeftButton extends Component{
	render(){
		return (
			<button className={styles.HomeScreenBoxLeftButton}>Login</button>
		)
	}
}
export default  HomeScreenBoxLeftButton;