import React, {PureComponent} from 'react';
import styles from './CompanySearch.module.css'
import colors from '../../utils/colors';
import Select from 'react-select';
import { connect } from 'react-redux';
import {getCompaniesList} from '../../store/actions/Company';

class CompanySearch extends PureComponent {
	state = {
		selectedOption: null,
	};

	componentDidMount() {
		const {authToken, downloadList, companyListDownloading} = this.props;
		if(companyListDownloading) {
			downloadList(authToken);
		}
	}

	handleChange = selectedOption => {
		this.setState({ selectedOption });
	}

	formatCompanyList = () => {
		function sortArrayOnName(a, b) {
			return a.value.localeCompare(b.value);
		}

		const {companyList} = this.props;
		if(companyList.length === 0) return companyList;

		const formattedResult = companyList.map((object) => {
			const nameWithCapital = object.company_name.substring(0, 1).toUpperCase() 
				+ object.company_name.substring(1);
			const newObject = {
				value: object.company_name,
				label: nameWithCapital
			}
			return newObject;
		})
		formattedResult.sort(sortArrayOnName)
		return formattedResult;
	}

	renderSearchBar = () => {
		const { selectedOption } = this.state;
		const boxStyles = {
			control: base => ({
				...base,
				border: 0,
				// This line disable the blue border
				boxShadow: 'none',
			  })
		};
		const theme=(theme) => ({
			...theme,
			colors: {
			...theme.colors,
			  primary25: colors.background,
			  primary: colors.dark
			},
		});
		const {companyList, companyListDownloading} = this.props;
		const placeholder = (companyList.length === 0 && !companyListDownloading) ? 
			'Something went wrong' : (companyListDownloading ? 
			'Downloading...' : 'Companies');
		const options = this.formatCompanyList(companyList);
		return (
			<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', 
				alignItems: 'center', width: '100%'}}>
				<div style={{color: colors.dark}} className={styles.searchHeading}>Referrals just a search away</div>
				<Select
					className={styles.searchBar}
					value={selectedOption}
					onChange={this.handleChange}
					options={options}
					placeholder={placeholder}
					styles={boxStyles}
					theme={theme}
				/>
			</div>
		)
	}

	renderSearchButton = () => {
		return (
			<div style={{width: '100%', display: 'flex', flexDirection: 'row', 
				justifyContent: 'center', alignItems: 'center'}}>
				<input 
					type="submit"
					value="Search"
					onClick={() => {
						// first check if this.props.companyListDownloading is true then do nothing
					}}
					className={styles.submitButton} 
					style={{color: colors.white}}/>	
			</div>
		)
	}

	render(){
		return (
			<div 
				style={{backgroundColor: colors.background}}
				className={styles.mainContainer}>
				<div style={{background: colors.dark}} className={styles.containerHeader}/>
				{this.renderSearchBar()}
				{this.renderSearchButton()}
			</div>
		);
	}
};
const mapStateToProps = state => {
	return {
		...state.Company,
		authToken: state.Auth.authToken
	};
};

function mapDispatchToProps(dispatch) {
	return {
		downloadList: (token) => {
			return dispatch(getCompaniesList(token));
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CompanySearch);