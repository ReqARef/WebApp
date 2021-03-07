import React, { PureComponent } from 'react';
import colors from '../../utils/colors'
import styles from './CompanySearchResult.module.css'
import ResultBox from '../../Components/ResultBox/ResultBox'
import qs from 'qs'
class CompanySearchResult extends PureComponent {

	componentWillMount() {
		const companyName = qs.parse(this.props.location.search , { ignoreQueryPrefix: true });
		console.log(companyName);
	}

	render(){
		return(
			<div className={styles.CompanySearchResult} style={{
				backgroundColor : colors.background
			}}> 
				<ResultBox/>
			</div>
		)
	}
}

export default CompanySearchResult;