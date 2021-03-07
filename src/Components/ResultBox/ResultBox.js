import React, { PureComponent } from 'react';
import styles from './ResultBox.module.css'
import Result from './Result/Result'
import Modal from '../Modal/Modal'
import Aux from '../../Hoc/Auxiliary'
import { connect } from 'react-redux';
import RequestForm from '../RequestForm/RequestForm'

class ResultBox extends PureComponent {
	state={
		showPopup : false,
		searchResult : [
			{	
				email : "salwanrohit1998@gmail.com",
				name :"Rohit Salwan",
				designation : "SDE",
				company : "amdocs"
			},
			{	
				email : "khajuriakanav@gmail.com",
				name :"Kanav Khajuria",
				designation : "Tech Expert",
				company : "cisco"
			},
			{	
				email : "sakshammehra@gmail.com",
				name :"Saksham Mehra",
				designation : "Associate Enggineer",
				company : "amdocs"
			}
		]
	}

	togglePopup = (email) => {
		this.setState({showPopup : !this.state.showPopup})
		this.props.requestToSetter(email);
	}

	render(){
		let resultData = this.state.searchResult.map(result => {
			return (
				<Result 
					showModal={this.togglePopup} 
					name={result.name} 
					key={result.email}
					designation={result.designation}
					company={result.company}	
					click={this.submitButtonHandler}
					email={result.email}
				/>
			)			
		});
		return (
			<Aux>
				<Modal show={this.state.showPopup} closeModal={this.togglePopup}>
					<RequestForm/>
				</Modal>
				<div className={styles.ResultBox}>
					<h1>Search Result</h1>
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