import React, { PureComponent } from 'react'
import colors from '../../../utils/colors'
import { borderRadius } from '../../../utils//styleConstants'
import styles from './Settings.module.css'
import countries from '../../../utils/countries'
import { connect } from 'react-redux'
import { getUserData, updateUserData } from '../../../store/actions/User'
import Loader from '../../Loader/Loader'
class Settings extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            errorOccurred: false,
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
            position: '',
            company: '',
            college: '',
            experience: '',
            country: '',
            // role: 1->Referer, 0 Referee
            role: '',
            bio: '',
            verified: ''
        }
        const { getData, authToken } = this.props
        getData(authToken)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            const { showLoader, user } = this.props
            if (!showLoader && !user) {
                this.setState({ errorOccurred: true })
                alert('Something went wrong')
            } else if (!showLoader && user) {
                const {
                    first_name: firstName,
                    last_name: lastName,
                    mobile,
                    email,
                    job_role: position,
                    company_name: company,
                    college,
                    experience,
                    country,
                    role,
                    bio,
                    email_verified: verified
                } = user
                const roleIntegerToString =
                    role === 0 || role === 1
                        ? role === 0
                            ? 'referee'
                            : 'referrer'
                        : ''
                this.setState({
                    firstName: firstName || '',
                    lastName: lastName || '',
                    mobile: mobile || '',
                    email: email || '',
                    position: position || '',
                    company: company || '',
                    college: college || '',
                    experience: experience || '',
                    country: country || '',
                    role: roleIntegerToString,
                    bio: bio || '',
                    errorOccurred: false,
                    verified: verified ? 'Yes' : 'No'
                })
            }
        }
    }

    handleOnSaveClicked = () => {
        const {
            firstName,
            lastName,
            mobile,
            email,
            position,
            company,
            college,
            experience,
            country,
            role,
            bio
        } = this.state
        const roleToInteger = role === 'referee' ? 0 : 1
        const body = {
            firstName,
            lastName,
            mobile,
            email,
            position,
            companyName: company,
            college,
            experience,
            country,
            role: roleToInteger,
            bio
        }
        const { setData, authToken } = this.props
        if (!firstName.trim() || !lastName.trim()) {
            alert('Name cannot be empty')
            return
        }
        setData(authToken, body)
    }

    renderHeader = () => {
        return (
            <div style={{ borderRadius }} className={styles.headerContainer}>
                <div
                    className={styles.headerText}
                    style={{ color: colors.dark }}
                >
                    My account
                </div>
            </div>
        )
    }

    handleInput = (e, label) => {
        this.setState({ [label]: e.target.value })
    }

    renderInputField = (label, heading, disabled = false) => {
        return (
            <div style={{}}>
                <div
                    className={styles.inputTextHeading}
                    style={{ color: colors.dark }}
                >
                    {heading}
                </div>
                <input
                    className={styles.inputText}
                    type="text"
                    rows={3}
                    placeholder={label}
                    value={this.state[label]}
                    onChange={(e) => this.handleInput(e, label)}
                    style={{
                        backgroundColor: colors.white,
                        color: colors.dark,
                        borderRadius: 5
                    }}
                    disabled={disabled}
                />
            </div>
        )
    }

    renderName = () => {
        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
            >
                <div style={{ width: '50%' }}>
                    {this.renderInputField('firstName', 'First Name')}
                </div>
                <div style={{ width: '50%' }}>
                    {this.renderInputField('lastName', 'Last Name')}
                </div>
            </div>
        )
    }

    renderEmail = () => {
        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                className={styles.dualContainer}
            >
                <div style={{ width: '50%' }}>
                    {this.renderInputField('email', 'Email Address', true)}
                </div>
                <div style={{ width: '50%' }}>
                    {this.renderInputField('verified', 'Email Verified', true)}
                </div>
            </div>
        )
    }

    renderCompanyAndPosition = () => {
        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                className={styles.dualContainer}
            >
                <div style={{ width: '50%' }}>
                    {this.renderInputField('company', 'Company Name')}
                </div>
                <div style={{ width: '50%' }}>
                    {this.renderInputField('position', 'Position')}
                </div>
            </div>
        )
    }

    renderCollegeAndExperience = () => {
        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                className={styles.dualContainer}
            >
                <div style={{ width: '50%' }}>
                    {this.renderInputField('college', 'College/University')}
                </div>
                <div style={{ width: '50%' }}>
                    {this.renderInputField('experience', 'Experience')}
                </div>
            </div>
        )
    }

    renderCountry = () => {
        const getCountryList = (countries) => {
            return countries.map((country) => {
                const { name, code } = country
                return (
                    <option value={code} style={{ color: 'red' }} key={code}>
                        {name}
                    </option>
                )
            })
        }
        return (
            <div style={{ width: '50%' }}>
                <div className={styles.inputTextHeading}>Country</div>
                <form>
                    <select
                        value={this.state.country}
                        onChange={(e) => {
                            this.setState({ country: e.target.value })
                        }}
                        style={{
                            backgroundColor: colors.white,
                            color: colors.dark,
                            width: '92%',
                            borderRadius: 5
                        }}
                        className={styles.inputText}
                    >
                        {getCountryList(countries)}
                    </select>
                </form>
            </div>
        )
    }

    renderRole = () => {
        return (
            <div style={{ width: '50%' }}>
                <div
                    className={styles.inputTextHeading}
                    style={{ color: colors.dark }}
                >
                    Role
                </div>
                <form>
                    <select
                        value={this.state.role}
                        onChange={(e) => {
                            this.setState({ role: e.target.value })
                        }}
                        style={{
                            backgroundColor: colors.white,
                            color: colors.dark,
                            width: '92%',
                            borderRadius: 5
                        }}
                        className={styles.inputText}
                    >
                        <option value="referrer" key={0}>
                            Give Referrals
                        </option>
                        <option value="referee" key={1}>
                            Get Referrals
                        </option>
                    </select>
                </form>
            </div>
        )
    }

    renderCountryAndRole = () => {
        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}
                className={styles.dualContainer}
            >
                {this.renderCountry()}
                {this.renderRole()}
            </div>
        )
    }

    renderBio = () => {
        return (
            <div style={{ width: '100%' }} className={styles.bioContainer}>
                <div
                    className={styles.inputTextHeading}
                    style={{ color: colors.dark }}
                >
                    {'About Me'}
                </div>
                <textarea
                    value={this.state.bio}
                    onChange={(e) => {
                        this.setState({ bio: e.target.value })
                    }}
                    placeholder={'Write your bio here'}
                    rows={4}
                    className={styles.inputTextBio}
                    style={{
                        backgroundColor: colors.white,
                        color: colors.dark,
                        borderRadius: 5
                    }}
                />
            </div>
        )
    }

    renderSaveButton = () => {
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
                    value="Save"
                    onClick={this.handleOnSaveClicked}
                    className={styles.submitButton}
                    style={{
                        backgroundColor: colors.dark,
                        color: colors.white
                    }}
                />
            </div>
        )
    }

    render() {
        let { showLoader } = this.props
        const { errorOccurred } = this.state
        showLoader = showLoader || errorOccurred
        return (
            <div
                style={{
                    backgroundColor: colors.white,
                    borderRadius
                }}
                className={styles.containerMain}
            >
                {showLoader && <Loader />}
                {!showLoader && this.renderHeader()}
                {!showLoader && this.renderName()}
                {!showLoader && this.renderEmail()}
                {!showLoader && this.renderCompanyAndPosition()}
                {!showLoader && this.renderCollegeAndExperience()}
                {!showLoader && this.renderCountryAndRole()}
                {!showLoader && this.renderBio()}
                {!showLoader && this.renderSaveButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.User
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getData: (token) => {
            return dispatch(getUserData(token))
        },
        setData: (token, body) => {
            return dispatch(updateUserData(token, body))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
