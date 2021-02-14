import React, {PureComponent} from 'react';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';
import styles from './MyProfile.module.css'
import colors from '../../utils/colors';


class MyProfile extends PureComponent {
	render(){
		return (
			<div style={{backgroundColor: colors.background}}>
				<div style={{background: colors.dark}} className={styles.containerHeader}/>
				<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} className={styles.componentContainer}>
					<Settings />
					<Profile />
				</div>
			</div>
		);
	}
};
export default MyProfile;