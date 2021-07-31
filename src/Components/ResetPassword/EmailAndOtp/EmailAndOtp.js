import React, { PureComponent } from 'react'
import styles from './EmailAndOtp.module.css'
import { authScreenParagraph } from '../../../utils/constants'
import colors from '../../../utils/colors'
import { connect } from 'react-redux'
import { sendOTP, verifyOTP } from '../../../store/actions/User'
import Loader from '../../Loader/Loader'
import { withRouter } from 'react-router-dom'

class EmailAndOtp extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            isOtpSent: false,
            showLoader: false,
            otp: ''
        }
    }

    handleemail = (e) => {
        this.setState({ email: e.target.value })
    }

    handleOtp = (e) => {
        this.setState({ otp: e.target.value })
    }

    renderLeftDiv = () => {
        return (
            <div
                className={styles.containerLeft}
                style={{
                    backgroundColor: colors.blue,
                    color: colors.fontcolorWhite
                }}
            >
                <h2 className={styles.leftHeading}>Welcome to ReqARef</h2>
                <p className={styles.leftPara}>{authScreenParagraph}</p>
            </div>
        )
    }

    handleSubmit = (e) => {
        const { isOtpSent, email, otp } = this.state
        const { verifyOTP, setParentEmail } = this.props
        e.preventDefault()
        if (isOtpSent) {
            setParentEmail(email)
            this.setState({ showLoader: true })
            verifyOTP(
                email,
                otp,
                () => {
                    this.setState({ showLoader: false })
                    this.props.handleFlip(e)
                },
                () => {
                    this.setState({ showLoader: false })
                }
            )
        } else {
            if (email === '') {
                alert('Email is empty')
                return
            }
            const { sendOTP } = this.props
            this.setState({ showLoader: true })
            sendOTP(
                email,
                () => {
                    this.setState({ isOtpSent: true, showLoader: false })
                },
                () => {
                    this.setState({ showLoader: false })
                }
            )
        }
    }

    renderLoader = () => {
        const { isFlipped } = this.props
        if (isFlipped) return null
        return <Loader />
    }

    renderSubmitButton = () => {
        const { isOtpSent, showLoader } = this.state
        const text = isOtpSent ? 'Verify' : 'Send OTP'
        return (
            <div
                onClick={this.handleSubmit}
                className={styles.submitButton}
                style={{
                    backgroundColor: colors.blue,
                    color: colors.fontcolorWhite,
                    cursor: 'pointer'
                }}
            >
                {showLoader ? this.renderLoader() : text}
            </div>
        )
    }

    renderForm = () => {
        const { isOtpSent } = this.state
        return (
            <form onSubmit={this.handleSubmit} className={styles.form}>
                <input
                    className={styles.inputText}
                    type="text"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.handleemail}
                    style={{
                        backgroundColor: colors.white,
                        color: colors.fontcolorBlack
                    }}
                />
                {isOtpSent && (
                    <input
                        className={styles.inputText}
                        type="text"
                        placeholder="Enter OTP"
                        value={this.state.otp}
                        onChange={this.handleOtp}
                        style={{
                            backgroundColor: colors.white,
                            color: colors.fontcolorBlack
                        }}
                    />
                )}
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
                    style={{ color: colors.fontcolorBlack }}
                >
                    Reset Password
                </h1>
                {this.renderForm()}
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
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        sendOTP: (email, successCallback, errorCallback) => {
            return dispatch(sendOTP(email, successCallback, errorCallback))
        },
        verifyOTP: (email, otp, successCallback, errorCallback) => {
            return dispatch(
                verifyOTP(email, otp, successCallback, errorCallback)
            )
        }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EmailAndOtp)
)
