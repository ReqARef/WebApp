import React, { Component } from 'react'
import styles from './RequestBox.module.css'
import inlineStyles from '../../utils/styleConstants'
import colors from '../../utils/colors'
import Request from './Request/Request'
import { connect } from 'react-redux'
import { getRequestListAsync } from '../../store/actions/Request'
import UserInfoModal from '../UserInfoModal/UserInfoModal'
import Loader from '../Loader/Loader'
import { setNavbarSelection } from '../../store/actions/Navbar'

class RequestBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalEmail: null,
            showModal: false,
            showLoader: true
        }
        this.page = 1
        this.getDataPerPage()
        const { setNavbarButtonSelection } = props
        setNavbarButtonSelection('REQUESTS')
    }

    getDataPerPage() {
        const { authToken, getRequests } = this.props
        getRequests(authToken, this.page - 1, () => {
            this.setState({ showLoader: false })
        })
    }

    listUpdated = () => {
        this.setState({ showLoader: true })
    }

    hideLoader = () => {
        this.setState({ showLoader: false })
    }

    renderLoader = () => {
        return (
            <div style={{ marginTop: '30vh' }}>
                <Loader height="50px" width="50px" />
            </div>
        )
    }

    handlePrevClick = () => {
        if (this.page === 1) return
        this.page = this.page - 1
        this.setState({ showLoader: true })
        this.getDataPerPage()
    }

    handleNexClick = () => {
        const { totalPages } = this.props
        if (totalPages === this.page) return
        this.page = this.page + 1
        this.setState({ showLoader: true })
        this.getDataPerPage()
    }

    renderPaginator = () => {
        const { totalPages } = this.props
        const prevBackground = this.page === 1 ? 'lightgray' : colors.blue
        const nextBackground =
            totalPages === this.page ? 'lightgray' : colors.blue
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '3vh'
                }}
            >
                <div
                    className={styles.button}
                    style={{
                        backgroundColor: prevBackground,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        color: colors.white
                    }}
                    onClick={this.handlePrevClick}
                >
                    Previous
                </div>
                <div>{`Page: ${this.page}`}</div>
                <div
                    className={styles.button}
                    style={{
                        backgroundColor: nextBackground,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        color: colors.white
                    }}
                    onClick={this.handleNexClick}
                >
                    Next
                </div>
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
                        avatar={request.user.avatar}
                        openModal={(modalEmail) => {
                            this.setState({ modalEmail, showModal: true })
                        }}
                        isVerified={this.props.isVerified}
                        requestId={request.id}
                        token={this.props.authToken}
                        updated={this.listUpdated}
                        hideLoader={() => {
                            this.setState({ showLoader: false })
                        }}
                    />
                )
            }
            return null
        })
    }

    renderHeading = () => {
        return (
            <div
                style={{
                    width: '100%'
                }}
            >
                <h1
                    style={{
                        marginLeft: '19vw',
                        color: colors.fontColorBlue
                    }}
                >
                    Requests
                </h1>
            </div>
        )
    }

    renderNoRequestsFoundText = () => {
        return (
            <div
                style={{
                    color: colors.black,
                    width: '100%',
                    marginTop: '20vh',
                    fontSize: '3vh',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                No requests found
            </div>
        )
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
                {this.renderHeading()}
                {showLoader && this.renderLoader()}
                <div
                    className={styles.RequestBox}
                    style={{
                        borderRadius: inlineStyles.borderRadius,
                        backgroundColor: colors.background,
                        margin: 'auto',
                        color: colors.fontcolorBlack,
                        paddingBottom: '70px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        overflow: 'auto'
                    }}
                >
                    {!showLoader && requests}
                    {requests &&
                        requests.length > 0 &&
                        !showLoader &&
                        this.renderPaginator()}
                    {requests &&
                        requests.length === 0 &&
                        !showLoader &&
                        this.renderNoRequestsFoundText()}
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
                : false,
        totalPages: state.requestReducer.totalPages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getRequests: (token, page, callback) => {
            return dispatch(getRequestListAsync(token, page, callback))
        },
        setNavbarButtonSelection: (value) => dispatch(setNavbarSelection(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestBox)
