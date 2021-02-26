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

	togglePopup = () => {
		this.setState({showPopup : !this.state.showPopup})
	}
	
	render(){
		return (
			<Aux>
				<Modal show={this.state.showPopup} closeModal={this.togglePopup}>
					<RequestForm/>
				</Modal>
				<div className={styles.ResultBox}>
					<h1>Search Result</h1>
					<Result showModal={this.togglePopup}/>
					<Result showModal={this.togglePopup} />
					<Result showModal={this.togglePopup}/>
					<Result showModal={this.togglePopup}/>
				</div>
			</Aux>
		)
	}
}

const mapStateToProps = state => {
	return {
		showPopup : state.showPopup
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onBackdropClick : () => dispatch({type : "HIDEPOPUP"})
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ResultBox);