import React, { Component} from 'react';
import styles from './RequestBox.module.css';
import inlineStyles from '../../utils/styleConstants';
import colors from '../../utils/colors';
import Request from './Request/Request'
import { connect } from 'react-redux'
import { getRequestAsync } from '../../store/actions/Request'

class RequestBox extends Component {

	componentDidMount() {
		const {authToken, searchUsers} = this.props;
		searchUsers(authToken);
	}

	getRequestData = () => {
		return (this.props.requests || []).map(request => {
			return (
				<Request
					key={request.user.email}
					userName = {request.user.first_name+" "+request.user.last_name}
					designation = {request.user.company_name ? request.user.company_name : "Student"}
					companyName = {request.user.job_role ? request.user.job_role : ""}
					country = {request.user.country ? request.user.country : "India"}
				/>
			)
		})
	}
	render(){
		let requests = this.getRequestData();
		return(
			<div className={styles.RequestBox} style={{
				borderRadius : inlineStyles.borderRadius,
				backgroundColor : colors.background,
				margin : "auto",
				paddingLeft : "70px",
				paddingTop : "30px",
				color : colors.dark,
				paddingBottom : "70px"
				}}>
				<h1>Requests</h1>
				{requests}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.User.authToken,
		requests : state.requestReducer.requests
	};
};

function mapDispatchToProps(dispatch) {
	return {
		searchUsers: (token) => {
			return dispatch(getRequestAsync(token))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestBox);