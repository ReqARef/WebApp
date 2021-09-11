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
import { withRouter } from 'react-router'
const qs = require('qs')

class RequestBox extends Component {
    constructor(props) {
        super(props)

        const qsObject = qs.parse(props.location.search, {
            ignoreQueryPrefix: true
        })
        this.page = parseInt(qsObject.page)

        this.state = {
            modalEmail: null,
            requestType: qsObject.type,
            showModal: false,
            showLoader: true
        }

        const { setNavbarButtonSelection } = props
        setNavbarButtonSelection('REQUESTS')
    }

    componentDidMount() {
        this.getDataPerPage()
    }

    getDataPerPage() {
        const { authToken, getRequests } = this.props
        const { requestType } = this.state
        this.setState({ showLoader: true })
        getRequests(authToken, this.page - 1, requestType, () => {
            this.setState({ showLoader: false })
        })
        this.props.history.push({
            pathname: '/request',
            search: `?type=${requestType}&page=${this.page}`
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
        this.getDataPerPage()
    }

    handleNexClick = () => {
        const { totalPages } = this.props
        if (totalPages === this.page) return
        this.page = this.page + 1
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
                    marginTop: '4vh'
                }}
            >
                <div
                    className={styles.button}
                    style={{
                        backgroundColor: prevBackground,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        color: colors.white,
                        marginRight: '3vw'
                    }}
                    onClick={this.handlePrevClick}
                >
                    Previous
                </div>
                <div
                    style={{
                        textAlign: 'center'
                    }}
                >{`Page: ${this.page} of ${totalPages}`}</div>
                <div
                    className={styles.button}
                    style={{
                        backgroundColor: nextBackground,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        color: colors.white,
                        marginLeft: '3vw'
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
            return (
                <Request
                    key={request.id}
                    userName={
                        request.user.first_name + ' ' + request.user.last_name
                    }
                    page={this.page - 1}
                    jobId={request.job_id ? request.job_id : 'Not Found'}
                    url={request.job_url}
                    comment={request.referee_comment}
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
                    requestType={this.state.requestType}
                />
            )
        })
    }

    changeRequestType = (requestType) => {
        if (this.state.requestType === requestType) return

        this.setState({ requestType }, () => {
            this.page = 1
            this.getDataPerPage()
            this.props.history.push({
                pathname: '/request',
                search: `?type=${requestType}&page=${this.page}`
            })
        })
    }

    renderHeading = () => {
        const { requestType } = this.state
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <div
                    style={{
                        color:
                            requestType === 'pending'
                                ? colors.blue
                                : colors.black,
                        marginRight: '14vw',
                        marginTop: '3vh',
                        fontSize: '30px',
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        this.changeRequestType('pending')
                    }}
                >
                    Pending
                </div>
                <div
                    style={{
                        color:
                            requestType === 'accepted'
                                ? colors.blue
                                : colors.black,
                        cursor: 'pointer',
                        marginTop: '3vh',
                        fontSize: '30px'
                    }}
                    onClick={() => {
                        this.changeRequestType('accepted')
                    }}
                >
                    Accepted
                </div>
                <div
                    style={{
                        color:
                            requestType === 'rejected'
                                ? colors.blue
                                : colors.black,
                        marginLeft: '14vw',
                        cursor: 'pointer',
                        marginTop: '3vh',
                        fontSize: '30px'
                    }}
                    onClick={() => {
                        this.changeRequestType('rejected')
                    }}
                >
                    Rejected
                </div>
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

    renderRequestsList = () => {
        const requests = this.getRequestData()
        const { showLoader } = this.state
        return (
            <div
                className={styles.RequestBox}
                style={{
                    width: '100%',
                    borderRadius: inlineStyles.borderRadius,
                    backgroundColor: colors.background,
                    color: colors.fontcolorBlack,
                    paddingBottom: '70px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
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
        )
    }

    render() {
        const { authToken } = this.props
        const { modalEmail, showModal, showLoader } = this.state

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
                {this.renderRequestsList()}
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
        getRequests: (token, page, type, callback) => {
            return dispatch(getRequestListAsync(token, page, type, callback))
        },
        setNavbarButtonSelection: (value) => dispatch(setNavbarSelection(value))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RequestBox))
