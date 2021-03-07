import React, { PureComponent } from 'react';
import colors from '../../utils/colors'
import styles from './CompanySearchResult.module.css'
import ResultBox from '../../Components/ResultBox/ResultBox'
import qs from 'qs'
import {server} from '../../utils/constants'
class CompanySearchResult extends PureComponent {

	state = {
		companyName : "",
		userList : []
	}

	async componentDidMount() {
		const company_name = qs.parse(this.props.location.search , { ignoreQueryPrefix: true });
		await this.setState({companyName: company_name})
		console.log(this.state.companyName)
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		const requestParams = {
			method: 'GET',
			credentials: 'include',
			headers
		}

		const userList = await fetch(server.concat('/user?company_name='+this.state.companyName.company_name),requestParams);
		console.log(userList);
	}

	render(){
		return(
			<div className={styles.CompanySearchResult} style={{
				backgroundColor : colors.background
			}}> 
				<ResultBox companyName={this.state.companyName}/>
			</div>
		)
	}
}

export default CompanySearchResult;