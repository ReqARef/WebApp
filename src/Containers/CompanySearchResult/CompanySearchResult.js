import React, { PureComponent } from 'react'
import colors from '../../utils/colors'
import styles from './CompanySearchResult.module.css'
import ResultBox from '../../Components/ResultBox/ResultBox'
import qs from 'qs'
import { connect } from 'react-redux'
import { getUsersOfCompanySearchList } from '../../store/actions/Search'
class CompanySearchResult extends PureComponent {
	constructor (props) {
		super(props)
		const companyName = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).company_name
		this.state = {
			companyName,
			userList: []
		}
	}

	componentDidMount () {
		const { searchUsers, authToken } = this.props
		const { companyName } = this.state
		searchUsers(authToken, companyName)
	}

	render () {
		const { usersOfCompanySearch, usersOfCompanySearchDownloading: loading } = this.props
		const { companyName } = this.state
		return (
			<div className={styles.CompanySearchResult} style={{
				backgroundColor: colors.background
			}}>
				{!loading && <ResultBox searchResult={usersOfCompanySearch} companyName={companyName}/>}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.User.authToken,
		usersOfCompanySearch: state.Search.usersOfCompanySearch,
		usersOfCompanySearchDownloading: state.Search.usersOfCompanySearchDownloading
	}
}

function mapDispatchToProps (dispatch) {
	return {
		searchUsers: (token, company) => {
			return dispatch(getUsersOfCompanySearchList(token, company))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CompanySearchResult)
