import React, {PureComponent} from 'react';
import colors from '../../../utils/colors';
import {borderRadius} from '../../../utils//styleConstants';
import styles from './Settings.module.css';
import countries from '../../../utils/countries';

class Settings extends PureComponent {
	constructor() {
		super()
		this.state = {
			firstName: 'Motu',
			lastName: 'Kurmi',
			mobile: '9191919191',
			email: 'motu@gmail.com',
			position: 'Student | Thug | Head',
			company: 'ReqARef',
			college: 'Thapar Institute of Engineering and Technology',
			experience: '7 months',
			country: 'IN',
			role: 'referrer',
			bio: 'I am next level motivational person that any company will be lucky to have. I dont refer anyone unless they agree to pay me 90% of their salary. Also note: Dont piss me off thank you :)'
		}
	}

	renderHeader = () => {
		return (
			<div style={{borderRadius}} className={styles.headerContainer}>
				<div className={styles.headerText} style={{color: colors.dark}}>
					My account
				</div>
			</div>
		)
	}

	handleInput = (e, label) => {
		this.setState({[label]: e.target.value})
	}

	renderInputField = (label, heading) => {
		return (
			<div style={{}}>
				<div className={styles.inputTextHeading} style={{color: colors.dark}}>{heading}</div>
				<input
					className={styles.inputText}
					type="text"
					rows={3}
					placeholder={label}
					value={this.state[label]}
					onChange={(e) => this.handleInput(e, label)}
					style={{backgroundColor: colors.white, color: colors.dark, borderRadius: 5}}
				/>
			</div>
		)
	}

	renderName = () => {
		return (
			<div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
				<div style={{width: '50%'}}>
					{this.renderInputField('firstName', 'First Name')}
				</div>
				<div style={{width: '50%'}}>
					{this.renderInputField('lastName', 'Last Name')}
				</div>
			</div>
		)
	}

	renderEmailAndMobile = () => {
		return (
			<div 
				style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
				className={styles.dualContainer}>
				<div style={{width: '50%'}}>
					{this.renderInputField('email', 'Email Address')}
				</div>
				<div style={{width: '50%'}}>
					{this.renderInputField('mobile', 'Mobile Number')}
				</div>
			</div>
		)
	}

	renderCompanyAndPosition = () => {
		return (
			<div 
				style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
				className={styles.dualContainer}>
				<div style={{width: '50%'}}>
					{this.renderInputField('company', 'Company Name')}
				</div>
				<div style={{width: '50%'}}>
					{this.renderInputField('position', 'Position')}
				</div>
			</div>
		)
	}

	renderCollegeAndExperience = () => {
		return (
			<div 
				style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
				className={styles.dualContainer}>
				<div style={{width: '50%'}}>
					{this.renderInputField('college', 'College/University')}
				</div>
				<div style={{width: '50%'}}>
					{this.renderInputField('experience', 'Experience')}
				</div>
			</div>
		)
	}

	renderCountry = () => {
		const getCountryList = (countries) => {
			return countries.map((country) => {
				const {name, code} = country;
				return (
					<option value={code} style={{color: 'red'}} key={code}>{name}</option>
				)
			})
		}
		return (
			<div style={{width: '50%'}}>
				<div className={styles.inputTextHeading}>Country</div>
				<form>
					<select
						value={this.state.country} 
						onChange={(e) => {this.setState({country: e.target.value})}} 
						style={{backgroundColor: colors.white, color: colors.dark, width: '92%', borderRadius: 5}}
						className={styles.inputText}>
					{getCountryList(countries)}
					</select>
				</form>
			</div>
		)
	}

	renderRole = () => {
		return (
			<div style={{width: '50%'}}>
				<div className={styles.inputTextHeading} style={{color: colors.dark}}>Role</div>
				<form>
					<select
						value={this.state.role} 
						onChange={(e) => {this.setState({role: e.target.value})}} 
						style={{backgroundColor: colors.white, color: colors.dark, width: '92%', borderRadius: 5}}
						className={styles.inputText}>
					<option value = "referrer" key={0}>Give Referrals</option>
					<option value = "referee" key={1}>Get Referrals</option>
					</select>
				</form>
			</div>
		)
	}
	
	renderCountryAndRole = () => {
		return (
			<div 
				style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
				className={styles.dualContainer}>
				{this.renderCountry()}
				{this.renderRole()}
			</div>
		)
	}

	renderBio = () => {
		return (
			<div style={{width: '100%'}} className={styles.bioContainer}>
				<div className={styles.inputTextHeading} style={{color: colors.dark}}>{"About Me"}</div>
				<textarea
					value={this.state.bio}
					onChange={(e) => {this.setState({bio: e.target.value})}}
					placeholder={"Write your bio here"}
					rows={4}
					className={styles.inputTextBio}
					style={{backgroundColor: colors.white, color: colors.dark, borderRadius: 5}}
				/>
			</div>
		)
	}

	renderSaveButton = () => {
		return (
			<div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
				<input 
					type="submit"
					value="Save"
					onClick={() => {alert('Saved')}}
					className={styles.submitButton} 
					style={{backgroundColor: colors.dark, color: colors.white}}/>	
			</div>
		)
	}

	render(){
		return (
			<div style={{
					backgroundColor: colors.white, borderRadius
				}}
				className={styles.containerMain}>
				{this.renderHeader()}
				{this.renderName()}
				{this.renderEmailAndMobile()}
				{this.renderCompanyAndPosition()}
				{this.renderCollegeAndExperience()}
				{this.renderCountryAndRole()}
				{this.renderBio()}
				{this.renderSaveButton()}
			</div>
		);
	}
};
export default Settings;