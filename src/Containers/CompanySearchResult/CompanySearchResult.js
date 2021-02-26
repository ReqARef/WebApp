import React, { PureComponent } from 'react';
import colors from '../../utils/colors'
import styles from './CompanySearchResult.module.css'
import ResultBox from '../../Components/ResultBox/ResultBox'

class CompanySearchResult extends PureComponent {
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