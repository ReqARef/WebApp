import React, {PureComponent} from 'react';
// import styles from './CompanySearch.module.css'
import colors from '../../utils/colors';
import CompanySearch from '../../Components/CompanySearch/CompanySearch';

class CompanySearchContainer extends PureComponent {
	render(){
		return (
			<div style={{backgroundColor: colors.background}}>
				<CompanySearch/>
			</div>
		);
	}
};
export default CompanySearchContainer;