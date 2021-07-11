import React, { Component } from 'react'
import styles from './RequestBox.module.css'
import inlineStyles from '../../utils/styleConstants'
import colors from '../../utils/colors'
import Request from './Request/Request'
import { connect } from 'react-redux'
import { getRequestListAsync } from '../../store/actions/Request'
import UserInfoModal from '../UserInfoModal/UserInfoModal'
import Loader from '../Loader/Loader'

class RequestBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalEmail: null,
            showModal: false,
            showLoader: true
        }
    }

    listUpdated = () => {
        console.log('popup')
        this.setState({ showLoader: true })
    }

    hideLoader = () => {
        console.log('hide')
        this.setState({ showLoader: false })
    }

    componentDidMount() {
        const { authToken, searchUsers } = this.props
        searchUsers(authToken, () => {
            this.setState({ showLoader: false })
        })
    }

    renderLoader = () => {
        return (
            <div style={{ marginTop: '30vh' }}>
                <Loader height="50px" width="50px" />
            </div>
        )
    }

    getRequestData = () => {
        return (this.props.requests || []).map((request) => {
            if (request.referral_status === 0) {
                return (
                    <Request
                        key={request.id}
                        userName={
                            request.user.first_name +
                            ' ' +
                            request.user.last_name
                        }
                        jobId={request.job_id ? request.job_id : ''}
                        country={
                            request.job_url ? request.job_url : 'url not found'
                        }
                        email={request.user.email}
                        openModal={(modalEmail) => {
                            this.setState({ modalEmail, showModal: true })
                        }}
                        isVerified={this.props.isVerified}
                        requestId={request.id}
                        token={this.props.authToken}
                        updated={this.listUpdated}
                        hideLoader={() => {
                            console.log('hide')
                            this.setState({ showLoader: false })
                        }}
                    />
                )
            }
            return null
        })
    }

    render() {
        const { authToken } = this.props
        const { modalEmail, showModal, showLoader } = this.state
        const requests = this.getRequestData()
        return (
            <div
                style={{
                    minHeight: '100vh'
                }}
            >
                <UserInfoModal
                    token={authToken}
                    modalEmail={modalEmail}
                    showModal={showModal}
                    closeModalCallback={() => {
                        this.setState({ showModal: false, modalEmail: null })
                    }}
                />
                <div
                    style={{
                        width: '100%'
                    }}
                >
                    <h1
                        style={{
                            marginLeft: '22.5vw',
                            color: colors.fontcolor1
                        }}
                    >
                        Requests
                    </h1>
                </div>
                {showLoader && this.renderLoader()}
                <div
                    className={styles.RequestBox}
                    style={{
                        borderRadius: inlineStyles.borderRadius,
                        backgroundColor: colors.background,
                        margin: 'auto',
                        color: colors.fontcolor1,
                        paddingBottom: '70px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        overflow: 'auto'
                    }}
                >
                    {!showLoader && requests}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authToken: state.User.authToken,
        requests: state.requestReducer.requests,
        isVerified:
            state.User && state.User.user
                ? state.User.user.email_verified
                : false
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchUsers: (token, callback) => {
            return dispatch(getRequestListAsync(token, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestBox)
