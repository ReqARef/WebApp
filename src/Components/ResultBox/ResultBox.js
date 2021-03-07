import React, { PureComponent } from 'react';
import styles from './ResultBox.module.css'
import Result from './Result/Result'
import Modal from '../Modal/Modal'
import Aux from '../../Hoc/Auxiliary'
import { connect } from 'react-redux';
import RequestForm from '../RequestForm/RequestForm'

class ResultBox extends PureComponent {
	state={
		showPopup : false
	}

	togglePopup = (email) => {
		this.setState({showPopup : !this.state.showPopup})
		this.props.requestToSetter(email);
	}

	getResultData = () => {
		return (this.props.searchResult || []).map(result => {
			return (
				<Result 
					showModal={this.togglePopup} 
					name={`${result.first_name} ${result.last_name}`} 
					key={result.email}
					designation={result.designation || "Designation unknown"}
					company={result.company}	
					click={this.submitButtonHandler}
					email={result.email}
				/>
			)			
		});
	}

	render() {
		const resultData = this.getResultData();
		let {companyName} = this.props;
		if(companyName)
			companyName = companyName.substring(0, 1).toUpperCase() + companyName.substring(1);
		return (
			<Aux>
				<Modal show={this.state.showPopup} closeModal={this.togglePopup}>
					<RequestForm companyName={this.props.companyName}/>
				</Modal>
				<div className={styles.ResultBox}>
					<h1>{companyName + " Employees"}</h1>
					{resultData}
				</div>
			</Aux>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		requestToSetter : (email) => dispatch({type : "SETREQUESTTO",email : email},)
	}
}
export default connect(null,mapDispatchToProps)(ResultBox);