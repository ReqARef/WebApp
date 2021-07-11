import React, { PureComponent } from 'react'
import colors from '../../utils/colors'
import styles from './Navbar.module.css'
import warning from '../../Assets/images/warning.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, sendEmailOTP, verifyEmailOTP } from '../../store/actions/User'
import AnimateHeight from 'react-animate-height'
import OtpInput from 'react-otp-input'
import Loader from '../Loader/Loader'

class Navbar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            verifyEmail: false,
            otp: '',
            resendCounter: 0,
            verifyingOTP: false,
            sendingOTPRequest: false,
            resendingOTPRequest: false
        }
    }

    // Navbar starts

    renderReqarefLogo = () => {
        return (
            <Link to="/" className={styles.link}>
                <div className={styles.logoContainer}>
                    <div style={{ color: colors.fontcolor2 }}>ReqARef</div>
                </div>
            </Link>
        )
    }

    renderButton = (text, link, color, borderColor) => {
        return (
            <Link to={link} className={styles.link}>
                <div className={styles.button} style={{ color, borderColor }}>
                    {text}
                </div>
            </Link>
        )
    }

    renderLogoutButton = () => {
        const { logoutAction } = this.props
        return (
            <Link to={'/'} className={styles.link}>
                <div
                    className={styles.button}
                    style={{
                        color: colors.fontcolor2,
                        borderColor: colors.white
                    }}
                    onClick={logoutAction}
                >
                    Logout
                </div>
            </Link>
        )
    }

    renderNavLinksWhenLoggedIn = () => {
        return (
            <div className={styles.navlinks}>
                {this.renderLogoutButton()}
                {this.renderButton(
                    'My Profile',
                    '/myprofile',
                    colors.fontcolor2,
                    colors.white
                )}
                {this.renderButton(
                    'Search',
                    '/companysearch',
                    colors.fontcolor2,
                    colors.white
                )}
                {this.renderButton(
                    'Requests',
                    '/request',
                    colors.fontcolor2,
                    colors.white
                )}
                {this.renderButton(
                    'Home',
                    '/',
                    colors.fontcolor2,
                    colors.white
                )}
            </div>
        )
    }

    renderNavLinksWhenNotLoggedIn = () => {
        return (
            <div className={styles.navlinks}>
                {this.renderButton(
                    'Login/Signup',
                    '/auth',
                    colors.white,
                    colors.white
                )}
                {this.renderButton('Home', '/', colors.white, colors.white)}
            </div>
        )
    }

    renderCompleteNavbar = () => {
        const { authToken } = this.props
        return (
            <div
                className={styles.navbar}
                style={{ backgroundColor: colors.dark }}
            >
                {this.renderReqarefLogo()}
                {authToken && this.renderNavLinksWhenLoggedIn()}
                {!authToken && this.renderNavLinksWhenNotLoggedIn()}
            </div>
        )
    }

    // Verification
    renderWarningLogo = () => {
        return (
            <img src={warning} style={{ height: '4vh', marginLeft: '1vw' }} />
        )
    }

    renderVerificationText = () => {
        return (
            <div
                style={{
                    color: colors.fontcolor1,
                    marginLeft: '1vw',
                    fontSize: '2.2vh'
                }}
            >
                Please verify your email to start using ReqARef
            </div>
        )
    }

    sendOTP = (source) => {
        const { sendEmailVerificationOTP, authToken } = this.props
        sendEmailVerificationOTP(authToken, this.otpSuccessCallback)
        if (source === 'verify') this.setState({ sendingOTPRequest: true })
        else if (source === 'resend') {
            this.setState({ resendingOTPRequest: true })
        }
    }

    otpSuccessCallback = () => {
        this.setState(
            {
                verifyEmail: true,
                resendCounter: 30,
                sendingOTPRequest: false,
                resendingOTPRequest: false
            },
            () => {
                if (this.state.verifyEmail) {
                    const interval = setInterval(() => {
                        if (
                            this.state.resendCounter === 0 ||
                            !this.state.verifyEmail
                        ) {
                            clearInterval(interval)
                            return
                        }
                        this.setState({
                            resendCounter: this.state.resendCounter - 1
                        })
                    }, 1000)
                }
            }
        )
    }

    closeOTPScreen = () => {
        this.setState({
            verifyEmail: false,
            otp: '',
            resendCounter: 0,
            verifyingOTP: false
        })
    }

    renderVerificationButton = () => {
        const { verifyEmail, sendingOTPRequest } = this.state
        const onClick = verifyEmail
            ? this.closeOTPScreen
            : () => {
                  this.sendOTP('verify')
              }
        const text = verifyEmail ? (
            'Close'
        ) : sendingOTPRequest ? (
            <Loader />
        ) : (
            'Verify'
        )
        return (
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row-reverse',
                    marginLeft: '1vw',
                    width: '100%'
                }}
            >
                <div
                    className={styles.button}
                    style={{
                        color: colors.fontcolor1,
                        borderColor: colors.dark,
                        marginRight: '1vw'
                    }}
                    onClick={onClick}
                >
                    {text}
                </div>
            </div>
        )
    }

    renderVerificationMessage = () => {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: '16px',
                    marginBottom: '16px'
                }}
            >
                {this.renderWarningLogo()}
                {this.renderVerificationText()}
                {this.renderVerificationButton()}
            </div>
        )
    }

    renderOTPBox = () => {
        const { resendCounter, verifyingOTP, resendingOTPRequest } = this.state
        const resendText =
            resendCounter === 0 ? (
                resendingOTPRequest ? (
                    <Loader />
                ) : (
                    'Resend'
                )
            ) : (
                resendCounter
            )
        const disabled = resendCounter !== 0
        const backgroundColor =
            resendCounter === 0 ? colors.dark : 'rgba(50, 50, 50, 0.75)'
        const handleOTPChange = (otp) => {
            this.setState({ otp })
        }

        const handleOTPSubmit = () => {
            if (this.state.otp.length < 6) {
                alert('Incomplete OTP')
                return
            }
            this.setState({ verifyingOTP: true }, () => {
                const { verifyOTP, authToken } = this.props
                const { otp } = this.state
                if (!authToken) {
                    alert('Something went wrong')
                    return
                }
                const successCallback = () => {
                    this.setState({
                        verifyEmail: false,
                        otp: '',
                        resendCounter: 0,
                        verifyingOTP: false
                    })
                }
                const errorCallback = () => {
                    this.setState(
                        {
                            otp: '',
                            verifyingOTP: false,
                            sendingOTPRequest: false,
                            resendingOTPRequest: false
                        },
                        () => {
                            alert('Invalid OTP')
                        }
                    )
                }

                verifyOTP(authToken, otp, successCallback, errorCallback)
            })
        }

        return (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <div
                    style={{
                        color: colors.fontcolor1,
                        fontSize: '22px',
                        marginBottom: '16px'
                    }}
                >
                    Please enter OTP recieved on your email
                </div>
                <OtpInput
                    value={this.state.otp}
                    onChange={handleOTPChange}
                    numInputs={6}
                    isInputNum={true}
                    separator={<span>-</span>}
                    inputStyle={{
                        height: '5vh',
                        width: '5vh',
                        fontSize: '3vh',
                        color: colors.fontcolor1
                    }}
                />
                <div style={{ display: 'flex' }}>
                    <div
                        className={styles.otpSubmitButton}
                        style={{
                            backgroundColor: colors.dark,
                            color: colors.fontcolor2,
                            marginTop: '16px',
                            marginRight: '8px'
                        }}
                        onClick={handleOTPSubmit}
                    >
                        {verifyingOTP ? <Loader /> : 'Submit'}
                    </div>
                    <div
                        className={styles.otpSubmitButton}
                        style={{
                            backgroundColor,
                            color: colors.fontcolor2,
                            marginTop: '16px',
                            marginLeft: '8px'
                        }}
                        onClick={() => {
                            if (this.state.resendCounter === 0)
                                this.sendOTP('resend')
                        }}
                        disabled={disabled}
                    >
                        {resendText}
                    </div>
                </div>
            </div>
        )
    }

    renderCompleteVerificationBar = () => {
        const { verifyEmail } = this.state
        const height = verifyEmail ? '30%' : '10%'
        return (
            <AnimateHeight
                id="example-panel"
                duration={500}
                height={height}
                easing="ease-in"
                className={styles.verificationBar}
                style={{
                    backgroundColor: colors.background
                }}
            >
                {verifyEmail && this.renderOTPBox()}
                {this.renderVerificationMessage()}
            </AnimateHeight>
        )
    }

    render() {
        const { authToken, user } = this.props
        const emailVerified = user && user.email_verified
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {this.renderCompleteNavbar()}
                {authToken &&
                    !emailVerified &&
                    this.renderCompleteVerificationBar()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authToken: state.User.authToken,
        user: state.User.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutAction: () => dispatch(logout()),
        sendEmailVerificationOTP: (token, callback) =>
            dispatch(sendEmailOTP(token, callback)),
        verifyOTP: (token, otp, callback, errorCallback) =>
            dispatch(verifyEmailOTP(token, otp, callback, errorCallback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
