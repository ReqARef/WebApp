import React, { PureComponent } from 'react'
import styles from './Signup.module.css'
import { authScreenParagraph } from '../../../utils/constants'
import colors from '../../../utils/colors'
import { connect } from 'react-redux'
import { signupAsync } from '../../../store/actions/User'
import Loader from '../../Loader/Loader'
import { withRouter } from 'react-router-dom'

class Signup extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            // role: 1->Referer, 0 Referee
            role: 1
        }
    }

    handleFirstName = (e) => {
        this.setState({ firstName: e.target.value })
    }

    handleLastName = (e) => {
        this.setState({ lastName: e.target.value })
    }

    handleemail = (e) => {
        this.setState({ email: e.target.value })
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handleOTP = (e) => {
        this.setState({ otp: e.target.value })
    }

    renderLoader = () => {
        const { isFlipped } = this.props
        if (!isFlipped) return null
        return <Loader />
    }

    renderViewChangingButton = () => {
        return (
            <button
                onClick={this.props.handleFlip}
                className={styles.button}
                style={{
                    backgroundColor: colors.dark,
                    borderColor: colors.white,
                    color: colors.white,
                    cursor: 'pointer'
                }}
            >
                To Login
            </button>
        )
    }

    renderViewChangingButtonHidden = () => {
        return (
            <button
                onClick={this.props.handleFlip}
                className={styles.buttonTemp}
                style={{
                    backgroundColor: colors.white,
                    color: colors.dark,
                    cursor: 'pointer'
                }}
            >
                To Login
            </button>
        )
    }

    renderLeftDiv = () => {
        return (
            <div
                className={styles.containerLeft}
                style={{ backgroundColor: colors.dark, color: colors.white }}
            >
                <h2 className={styles.leftHeading}>Welcome to ReqARef</h2>
                <p className={styles.leftPara}>{authScreenParagraph}</p>
                <div className={styles.buttonContainer}>
                    {this.renderViewChangingButton()}
                </div>
            </div>
        )
    }

    renderRadioButtons = () => {
        const referee =
            this.state.role === 0 ? styles.radioSelected : styles.radio
        const referrer =
            this.state.role === 1 ? styles.radioSelected : styles.radio
        return (
            <div className={styles.radioContainer}>
                <div className={styles.radioText}>Role: </div>
                <div
                    className={referrer}
                    onClick={() => {
                        this.setState({ role: 1 })
                    }}
                />
                <div className={styles.radioText}>Give Referral</div>
                <div
                    className={referee}
                    onClick={() => {
                        this.setState({ role: 0 })
                    }}
                />
                <div className={styles.radioText}>Get Referral</div>
            </div>
        )
    }

    handleSignup = (e) => {
        e.preventDefault()
        const { firstName, lastName, email, password, role } = this.state
        if (!firstName || !lastName) {
            alert('Enter full name')
            return
        }
        if (!email || !password) {
            alert('Enter email/password')
            return
        }
        const { sendSignUpReq } = this.props
        sendSignUpReq(firstName, lastName, email, password, role)
    }

    renderSubmitButton = () => {
        return (
            <div
                onClick={this.handleSignup}
                className={styles.submitButton}
                style={{
                    backgroundColor: colors.dark,
                    color: colors.white,
                    cursor: 'pointer'
                }}
            >
                {this.props.showLoader ? this.renderLoader() : 'Signup'}
            </div>
        )
    }

    renderForm = () => {
        return (
            <form className={styles.form}>
                <div className={styles.nameContainer}>
                    <input
                        className={styles.nameText}
                        type="text"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.handleFirstName}
                        style={{
                            backgroundColor: colors.white,
                            color: colors.dark
                        }}
                    />
                    <div
                        className={styles.nameSeparator}
                        style={{ backgroundColor: colors.white }}
                    />
                    <input
                        className={styles.nameText}
                        type="text"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleLastName}
                        style={{
                            backgroundColor: colors.white,
                            color: colors.dark
                        }}
                    />
                </div>
                <input
                    className={styles.inputText}
                    type="text"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleemail}
                    style={{
                        backgroundColor: colors.white,
                        color: colors.dark
                    }}
                />
                <input
                    className={styles.inputText}
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handlePassword}
                    style={{
                        backgroundColor: colors.white,
                        color: colors.dark
                    }}
                />
                {this.renderRadioButtons()}
                {this.renderSubmitButton()}
            </form>
        )
    }

    renderRightDiv = () => {
        return (
            <div
                className={styles.containerRight}
                style={{ backgroundColor: colors.white }}
            >
                <h1
                    className={styles.rightHeader}
                    style={{ color: colors.dark }}
                >
                    Sign Up
                </h1>
                {this.renderForm()}
                {this.renderViewChangingButtonHidden()}
            </div>
        )
    }

    renderWholeCard = () => {
        return (
            <div>
                {this.renderLeftDiv()}
                {this.renderRightDiv()}
            </div>
        )
    }

    render() {
        const { authToken } = this.props
        if (authToken) {
            this.props.history.push({
                pathname: '/'
            })
        }
        return (
            <div className={styles.containerMain}>{this.renderWholeCard()}</div>
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
        sendSignUpReq: (firstName, lastName, email, password, role) => {
            return dispatch(
                signupAsync(firstName, lastName, email, password, role)
            )
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))
