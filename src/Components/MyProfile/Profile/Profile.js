import React, {PureComponent} from 'react';
import styles from './Profile.module.css'
import colors from '../../../utils/colors';
import {borderRadius} from '../../../utils/styleConstants';

class Profile extends PureComponent {

	renderAvatar = () => {
		return (
			<div className={styles.avatarContainer} style={{backgroundColor: colors.background}}>
			</div>
		)
	}

	renderName = () => {
		const name = 'Motu Kurmi'
		return (
			<div className={styles.nameText} style={{color: colors.dark}}>
				{name}
			</div>
		)
	}

	renderLocation = () => {
		const location = 'Gurgaon, India'
		return (
			<div className={styles.locationText} style={{color: colors.dark}}>
				{location}
			</div>
		)
	}

	renderDesignation = () => {
		const designation = 'Student | Thug | Head @ ReqARef'
		return (
			<div className={styles.designationText} style={{color: colors.dark}}>
				{designation}
			</div>
		)
	}

	renderCollegeName = () => {
		const college = 'Thapar Institute of Engineering and Technology'
		return (
			<div className={styles.collegeText} style={{color: colors.dark}}>
				{college}
			</div>
		)
	}

	renderExperience = () => {
		const experience = '7 months'
		return (
			<div className={styles.collegeText} style={{color: colors.dark}}>
				{'Experience: ' + experience}
			</div>
		)
	}

	renderBio = () => {
		const bio = 'I am next level motivational person that any company will be lucky to have. I dont refer anyone unless they agree to pay me 90% of their salary. Also note: Dont piss me off thank you :)'
		return (
			<div className={styles.collegeText} style={{color: colors.dark, marginBottom: 30}}>
				{bio}
			</div>
		)
	}

	renderDetails = () => {
		return (
			<div className={styles.detailsContainer}>
				{this.renderName()}
				{this.renderLocation()}
				{this.renderDesignation()}
				{this.renderCollegeName()}
				{this.renderExperience()}
				<div className={styles.br}/>
				{this.renderBio()}
			</div>
		)
	}

	render(){
		return (
			<div style={{
				backgroundColor: colors.white, borderRadius
			}} 
			className={styles.containerMain}>
				{this.renderAvatar()}
				{this.renderDetails()}
			</div>
		);
	}
};
export default Profile;