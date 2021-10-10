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
import logoImage from '../../Assets/images/logo.png'
import dropdownImage from '../../Assets/images/dropdown.jpeg'
import navbarIcon from '../../Assets/images/navbar.jpg'

class Navbar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            verifyEmail: false,
            otp: '',
            resendCounter: 0,
            verifyingOTP: false,
            sendingOTPRequest: false,
            resendingOTPRequest: false,
            responsiveNavbarClick: false
        }
    }

    // Navbar starts

    renderReqarefLogo = () => {
        return (
            <Link to="/" className={styles.link}>
                <div className={styles.logoContainer}>
                    <img src={logoImage} className={styles.logo} />
                </div>
            </Link>
        )
    }

    renderButton = (text, link, color, borderColor, background, style) => {
        const backgroundColor = background || colors.white
        return (
            <Link to={link} className={styles.link}>
                <div
                    className={styles.button}
                    style={{
                        color,
                        borderColor,
                        fontSize: 'larger',
                        backgroundColor,
                        ...style
                    }}
                >
                    {text}
                </div>
            </Link>
        )
    }

    renderResponsiveButton = (
        text,
        link,
        color,
        borderColor,
        background,
        style
    ) => {
        const backgroundColor = background || colors.white
        return (
            <Link to={link} className={styles.link}>
                <div
                    className={styles.responsiveButton}
                    style={{
                        color,
                        borderColor,
                        fontSize: 'larger',
                        backgroundColor,
                        ...style
                    }}
                    onClick={() => {
                        this.setState({ responsiveNavbarClick: false })
                    }}
                >
                    {text}
                </div>
            </Link>
        )
    }

    renderLogoutButton = (isResponsive = false) => {
        const { logoutAction } = this.props
        const className = isResponsive ? styles.responsiveButton : styles.button
        return (
            <Link to={'/'} className={styles.link}>
                <div
                    className={className}
                    style={{
                        color: colors.fontcolorBlack,
                        borderColor: colors.blue,
                        fontSize: 'larger',
                        borderBottom: '0px solid ' + colors.black,
                        marginLeft: '10px'
                    }}
                    onClick={logoutAction}
                >
                    Logout
                </div>
            </Link>
        )
    }

    renderNavLinksWhenLoggedIn = () => {
        const { selected } = this.props
        return (
            <div className={styles.navlinks}>
                <div className={styles.dropdown}>
                    <img src={dropdownImage} className={styles.dropdownIcon} />
                    <div className={styles.dropdown_content}>
                        <div
                            style={{
                                paddingTop: '0.5vh',
                                backgroundColor: colors.white,
                                borderRadius: '10px'
                            }}
                        >
                            {this.renderLogoutButton()}
                        </div>
                    </div>
                </div>

                {this.renderButton(
                    'My Profile',
                    '/myprofile',
                    selected === 'PROFILE'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    selected === 'PROFILE' ? colors.black : colors.blue,
                    selected === 'PROFILE' ? colors.blue : colors.white
                )}
                {this.renderButton(
                    'Search',
                    '/companysearch',
                    selected === 'COMPANY_SEARCH'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    selected === 'COMPANY_SEARCH' ? colors.black : colors.blue,
                    selected === 'COMPANY_SEARCH' ? colors.blue : colors.white
                )}
                {this.renderButton(
                    'Requests',
                    '/request?type=pending&page=1',
                    selected === 'REQUESTS'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    selected === 'REQUESTS' ? colors.black : colors.blue,
                    selected === 'REQUESTS' ? colors.blue : colors.white
                )}
                {this.renderButton(
                    'Home',
                    '/',
                    selected === 'HOME'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    selected === 'HOME' ? colors.black : colors.blue,
                    selected === 'HOME' ? colors.blue : colors.white
                )}
            </div>
        )
    }

    renderNavLinksWhenLoggedInResponsive = () => {
        const { selected } = this.props
        return (
            <div>
                {this.renderResponsiveButton(
                    'Home',
                    '/',
                    selected === 'HOME'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    selected === 'HOME' ? colors.black : colors.blue,
                    selected === 'HOME' ? colors.blue : colors.white
                )}
                {this.renderResponsiveButton(
                    'Requests',
                    '/request?type=pending&page=1',
                    selected === 'REQUESTS'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    selected === 'REQUESTS' ? colors.black : colors.blue,
                    selected === 'REQUESTS' ? colors.blue : colors.white
                )}
                {this.renderResponsiveButton(
                    'Search',
                    '/companysearch',
                    selected === 'COMPANY_SEARCH'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    selected === 'COMPANY_SEARCH' ? colors.black : colors.blue,
                    selected === 'COMPANY_SEARCH' ? colors.blue : colors.white
                )}
                {this.renderResponsiveButton(
                    'My Profile',
                    '/myprofile',
                    selected === 'PROFILE'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    selected === 'PROFILE' ? colors.black : colors.blue,
                    selected === 'PROFILE' ? colors.blue : colors.white
                )}
                {this.renderLogoutButton(true)}
            </div>
        )
    }

    renderNavLinksWhenNotLoggedIn = () => {
        const { selected } = this.props
        return (
            <div className={styles.navlinks}>
                {this.renderButton(
                    'Login',
                    '/',
                    selected === 'AUTH'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    colors.black,
                    selected === 'AUTH' ? colors.blue : colors.white,
                    { border: '2px solid ' + colors.black }
                )}
                {this.renderButton(
                    'Home',
                    '/home',
                    selected === 'HOME'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    selected === 'HOME' ? colors.black : colors.blue,
                    selected === 'HOME' ? colors.blue : colors.white
                )}
            </div>
        )
    }

    renderNavLinksWhenNotLoggedInResponsive = () => {
        const { selected } = this.props
        return (
            <div>
                {this.renderResponsiveButton(
                    'Home',
                    '/home',
                    selected === 'HOME'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    selected === 'HOME' ? colors.black : colors.blue,
                    selected === 'HOME' ? colors.blue : colors.white
                )}
                {this.renderResponsiveButton(
                    'Login',
                    '/',
                    selected === 'AUTH'
                        ? colors.fontcolorWhite
                        : colors.fontcolorBlack,
                    colors.black,
                    selected === 'AUTH' ? colors.blue : colors.white,
                    { border: '2px solid ' + colors.black }
                )}
            </div>
        )
    }

    renderResponsiveNavbar = () => {
        const onClick = () => {
            this.setState({
                responsiveNavbarClick: !this.state.responsiveNavbarClick
            })
        }
        const className = this.state.responsiveNavbarClick
            ? styles.responsiveNavbarContentShow
            : styles.responsiveNavbarContentHide
        const { authToken } = this.props
        return (
            <div className={styles.responsiveDropdown}>
                <img
                    src={navbarIcon}
                    className={styles.responsiveNavbarIcon}
                    onClick={onClick}
                    style={{ cursor: 'pointer' }}
                />
                <div
                    className={className}
                    style={{ backgroundColor: colors.white }}
                >
                    {authToken && this.renderNavLinksWhenLoggedInResponsive()}
                    {!authToken &&
                        this.renderNavLinksWhenNotLoggedInResponsive()}
                </div>
            </div>
        )
    }

    renderCompleteNavbar = () => {
        const { authToken } = this.props
        return (
            <div
                className={styles.navbar}
                style={{ backgroundColor: colors.white }}
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
                    color: colors.fontcolorBlack,
                    marginLeft: '1vw',
                    fontSize: '2.2vh'
                }}
            >
                Please verify your email
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
                    className={styles.verifyButton}
                    style={{
                        color: colors.fontcolorBlack
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
            resendCounter === 0 ? colors.blue : 'rgba(50, 50, 50, 0.75)'
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
                        color: colors.fontcolorBlack,
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
                        fontSize: '16px',
                        color: colors.fontcolorBlack
                    }}
                />
                <div style={{ display: 'flex' }}>
                    <div
                        className={styles.otpSubmitButton}
                        style={{
                            backgroundColor: colors.blue,
                            color: colors.fontcolorWhite,
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
                            color: colors.fontcolorWhite,
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
                    alignItems: 'center',
                    zIndex: '1000'
                }}
            >
                {this.renderCompleteNavbar()}
                {this.renderResponsiveNavbar()}
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
        user: state.User.user,
        selected: state.Navbar.selected
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
