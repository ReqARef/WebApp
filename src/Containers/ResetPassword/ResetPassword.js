import React, {PureComponent} from 'react';
import ResetPassword from '../../Components/ResetPassword/ResetPassword';
import styles from './ResetPassword.module.css'


class ResetPasswordContainer extends PureComponent {
	render(){
		return (
			<div className ={styles.ResetPassword}>
				<ResetPassword />
			</div>
		);
	}
};

export default ResetPasswordContainer;
