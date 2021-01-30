import React, {Component} from 'react';
import styles from './HomeScreenBoxLeft.module.css';
import HomeScreenBoxLeftText from "./HomeScreenBoxLeftText/HomeScreenBoxLeftText";
import HomeScreenBoxLeftButton from "./HomeScreenBoxLeftButton/HomeScreenBoxLeftButton";
class HomeScreenBoxLeft extends Component {
	render(){
		return (
			<div className={styles.LeftSide}>
				<HomeScreenBoxLeftText/>
				<HomeScreenBoxLeftButton/>
			</div>
		);
	}
}

export default HomeScreenBoxLeft;