import React, {PureComponent} from 'react';
// import styles from './MyProfile.module.css'
import MyProfile from '../../Components/MyProfile/MyProfile';
import colors from '../../utils/colors';

class MyProfileContainer extends PureComponent {
	render(){
		return (
			<div style={{backgroundColor: colors.background}}>
				<MyProfile/>
			</div>
		);
	}
};
export default MyProfileContainer;