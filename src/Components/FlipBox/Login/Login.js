import React, { PureComponent } from 'react'
import styles from './Login.module.css'
import { authScreenParagraph } from '../../../utils/constants'
import colors from '../../../utils/colors'
import { connect } from 'react-redux'
import { loginAsync } from '../../../store/actions/User'
import Loader from '../../Loader/Loader'
import { withRouter } from 'react-router-dom'

class Login extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            showLoader: false
        }
    }

    handleemail = (e) => {
        this.setState({ email: e.target.value })
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    renderViewChangingButton = () => {
        return (
            <div>
                <button
                    onClick={this.props.handleFlip}
                    className={styles.button}
                    style={{
                        backgroundColor: colors.blue,
                        borderColor: colors.white,
                        color: colors.fontcolorWhite,
                        cursor: 'pointer'
                    }}
                >
                    To SignUp
                </button>
            </div>
        )
    }

    renderViewChangingButtonHidden = () => {
        return (
            <div
                className={styles.hiddenButtonContainer}
                style={{ marginTop: '16px' }}
            >
                <div
                    onClick={this.props.handleFlip}
                    className={styles.buttonTemp}
                    style={{
                        color: colors.fontcolorBlack,
                        cursor: 'pointer'
                    }}
                >
                    To SignUp
                </div>
                {this.renderResetPassword()}
            </div>
        )
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
                <h2
                    className={styles.leftHeading}
                    style={{ color: colors.fontcolorWhite }}
                >
                    Welcome to ReqARef
                </h2>
                <p className={styles.leftPara}>{authScreenParagraph}</p>
                <div className={styles.buttonContainer}>
                    {this.renderViewChangingButton()}
                    {this.renderResetPassword()}
                </div>
            </div>
        )
    }

    handleLogin = (e) => {
        e.preventDefault()
        const { email, password } = this.state
        if (email === '' || password === '') {
            alert('Email or Password empty')
            return
        }
        const { sendLoginReq } = this.props
        this.setState({ showLoader: true })
        sendLoginReq(this.state.email, this.state.password, () => {
            this.setState({ showLoader: false })
        })
    }

    renderLoader = () => {
        const { isFlipped } = this.props
        if (isFlipped) return null
        return <Loader />
    }

    renderSubmitButton = () => {
        return (
            <div
                onClick={this.handleLogin}
                className={styles.submitButton}
                style={{
                    backgroundColor: colors.blue,
                    color: colors.fontcolorWhite,
                    marginTop: '16px'
                }}
            >
                {this.state.showLoader ? this.renderLoader() : 'Login'}
            </div>
        )
    }

    renderForm = () => {
        return (
            <form onSubmit={this.handleLogin} className={styles.form}>
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
                <input
                    className={styles.inputText}
                    type="password"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.handlePassword}
                    style={{
                        backgroundColor: colors.white,
                        color: colors.fontcolorBlack
                    }}
                />
                {this.renderSubmitButton()}
            </form>
        )
    }

    renderResetPassword = () => {
        return (
            <a
                href={'/resetPassword'}
                className={styles.resetPassword}
                style={{ color: colors.fontcolorBlack }}
            >
                Reset password
            </a>
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
                    style={{ color: colors.fontColorBlue }}
                >
                    Log In
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
        return <div>{this.renderWholeCard()}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.User
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendLoginReq: (username, password, callback) => {
            return dispatch(loginAsync(username, password, callback))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
