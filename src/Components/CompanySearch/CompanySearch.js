import React, { PureComponent } from 'react'
import styles from './CompanySearch.module.css'
import colors from '../../utils/colors'
import Select from 'react-select'
import { connect } from 'react-redux'
import { getCompaniesList } from '../../store/actions/Company'
import { withRouter } from 'react-router-dom'
import { setNavbarSelection } from '../../store/actions/Navbar'

class CompanySearch extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
            showLoader: false
        }
        const { setNavbarButtonSelection } = props
        setNavbarButtonSelection('COMPANY_SEARCH')
    }

    componentDidMount() {
        const { authToken, downloadList, companyListDownloading } = this.props
        if (companyListDownloading) {
            downloadList(authToken)
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption })
    }

    formatCompanyList = () => {
        function sortArrayOnName(a, b) {
            return a.label.localeCompare(b.label)
        }

        const { companyList } = this.props
        if (companyList.length === 0) return companyList

        const formattedResult = companyList.map((object, index) => {
            const nameWithCapital =
                object.company_name.substring(0, 1).toUpperCase() +
                object.company_name.substring(1)
            const newObject = {
                value: index,
                label: nameWithCapital
            }
            return newObject
        })
        formattedResult.sort(sortArrayOnName)
        return formattedResult
    }

    renderSearchBar = () => {
        const { selectedOption } = this.state
        const boxStyles = {
            option: (provided) => ({
                ...provided,
                color: colors.fontcolorBlack
            }),
            control: (base) => ({
                ...base,
                border: 0,
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                color: colors.fontcolorBlack
            }),
            singleValue: (provided) => ({
                ...provided,
                color: colors.fontcolorBlack,
                fontSize: 'larger'
            })
        }
        const theme = (theme) => ({
            ...theme,
            colors: {
                ...theme.colors,
                primary25: colors.background,
                primary: colors.blue
            }
        })
        const { companyList, companyListDownloading } = this.props
        const placeholder =
            companyList.length === 0 && !companyListDownloading
                ? 'Something went wrong'
                : companyListDownloading
                ? 'Downloading...'
                : 'Companies'
        const options = this.formatCompanyList(companyList)
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                <div
                    style={{ color: colors.fontColorBlue }}
                    className={styles.searchHeading}
                >
                    Referrals just a search away
                </div>
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
        const { selectedOption } = this.state
        const backgroundColor = selectedOption
            ? colors.blue
            : 'rgba(50, 50, 50, 0.75)'
        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <input
                    type="submit"
                    value={this.state.showLoader ? 'Searching...' : 'Search'}
                    onClick={() => this.onSearchClickHandler()}
                    className={styles.submitButton}
                    style={{
                        color: colors.fontcolorWhite,
                        backgroundColor,
                        cursor: 'pointer'
                    }}
                    disabled={!selectedOption}
                />
            </div>
        )
    }

    onSearchClickHandler = () => {
        const { isVerified } = this.props

        if (!this.props.companyListDownloading) {
            if (!isVerified) {
                alert('Please verify your email to continue using ReqARef')
                return
            }

            this.props.history.push({
                pathname: '/searchresult',
                search:
                    '?company_name=' +
                    this.props.companyList[this.state.selectedOption.value]
                        .company_name
            })
        }
    }

    render() {
        return (
            <div
                style={{ backgroundColor: colors.background }}
                className={styles.mainContainer}
            >
                {this.renderSearchBar()}
                {this.renderSearchButton()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ...state.Company,
        authToken: state.User.authToken,
        isVerified:
            state.User && state.User.user
                ? state.User.user.email_verified
                : false
    }
}

function mapDispatchToProps(dispatch) {
    return {
        downloadList: (token) => {
            return dispatch(getCompaniesList(token))
        },
        setNavbarButtonSelection: (value) => dispatch(setNavbarSelection(value))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CompanySearch)
)
