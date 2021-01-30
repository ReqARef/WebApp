import React, {Component} from 'react';
import styles from './HomeScreen.module.css'
import HomeScreenBox from '../../Components/HomeScreenBox/HomeScreenBox';
class HomeScreen extends Component {
	render(){
		return (
			<div className ={styles.HomeScreenBackground}>
				<HomeScreenBox/>
			</div>
		);
	}
};
export default HomeScreen;