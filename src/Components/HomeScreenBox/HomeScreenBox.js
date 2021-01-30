import React,  {Component} from 'react';
import styles from "./HomeScreenBox.module.css";
import HomeScreenBoxLeft from "./HomeScreenBoxLeft/HomeScreenBoxLeft"
import HomeScreenBoxRight from "./HomeScreenBoxRight/HomeScreenBoxRight"
class HomeScreenBox extends Component{
	render(){
		return (
			<div className={styles.HomeScreenBoxInner}>
				<HomeScreenBoxLeft/>
				<HomeScreenBoxRight/>
			</div>
		);
	}
}

export default HomeScreenBox;