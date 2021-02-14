import React, {PureComponent} from 'react';
import styles from './CompanySearch.module.css'
import colors from '../../utils/colors';
import Select from 'react-select';

const options = [
	{ value: '1', label: 'Amdocs' },
	{ value: '2', label: 'Cisco' },
	{ value: '3', label: 'Microsoft' }
  ];

class CompanySearch extends PureComponent {
	state = {
		selectedOption: null,
	};

	handleChange = selectedOption => {
		this.setState({ selectedOption });
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
		  })
		return (
			<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
				<div style={{color: colors.dark}} className={styles.searchHeading}>Referrals just a search away</div>
				<Select
					className={styles.searchBar}
					value={selectedOption}
					onChange={this.handleChange}
					options={options}
					placeholder="Companies"
					styles={boxStyles}
					theme={theme}
				/>
			</div>
		)
	}

	renderSearchButton = () => {
		return (
			<div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
				<input 
					type="submit"
					value="Search"
					onClick={() => {}}
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
export default CompanySearch;