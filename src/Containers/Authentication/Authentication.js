import React, {PureComponent} from 'react';
import styles from './Authentication.module.css'
import FlipBox from '../../Components/FlipBox/FlipBox';

class Authentication extends PureComponent {
	render(){
		return (
			<div className ={styles.Authentication}>
				<FlipBox />
			</div>
		);
	}
};
export default Authentication;