import React, { PureComponent } from 'react'
import colors from '../../utils/colors'
import styles from './CompanySearchResult.module.css'
import ResultBox from '../../Components/ResultBox/ResultBox'
import qs from 'qs'
import { connect } from 'react-redux'
import { getUsersOfCompanySearchList } from '../../store/actions/Search'
import Loader from '../../Components/Loader/Loader'
class CompanySearchResult extends PureComponent {
    constructor(props) {
        super(props)
        const companyName = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        }).company_name
        this.state = {
            companyName,
            userList: []
        }
    }

    componentDidMount() {
        const { searchUsers, authToken } = this.props
        const { companyName } = this.state
        searchUsers(authToken, companyName)
    }

    renderLoader = () => {
        return (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    top: '30vh',
                    position: 'absolute'
                }}
            >
                <Loader height="50px" width="50px" />
            </div>
        )
    }

    renderResults = () => {
        const { usersOfCompanySearch } = this.props
        const { companyName } = this.state
        return (
            <div style={{ backgroundColor: colors.background }}>
                <div
                    style={{
                        height: '10vh',
                        backgroundColor: colors.background
                    }}
                />
                <div>
                    <ResultBox
                        searchResult={usersOfCompanySearch}
                        companyName={companyName}
                    />
                </div>
            </div>
        )
    }

    render() {
        const { usersOfCompanySearchDownloading: loading } = this.props

        return (
            <div
                className={styles.CompanySearchResult}
                style={{
                    backgroundColor: colors.background
                }}
            >
                {loading && this.renderLoader()}
                {!loading && this.renderResults()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authToken: state.User.authToken,
        usersOfCompanySearch: state.Search.usersOfCompanySearch,
        usersOfCompanySearchDownloading:
            state.Search.usersOfCompanySearchDownloading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchUsers: (token, company) => {
            return dispatch(getUsersOfCompanySearchList(token, company))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanySearchResult)
