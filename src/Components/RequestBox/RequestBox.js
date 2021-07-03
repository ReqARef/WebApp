import React, { Component } from 'react'
import styles from './RequestBox.module.css'
import inlineStyles from '../../utils/styleConstants'
import colors from '../../utils/colors'
import Request from './Request/Request'
import { connect } from 'react-redux'
import { getRequestListAsync } from '../../store/actions/Request'
import RefereeModal from './RefereeModal/RefereeModal'

class RequestBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalEmail: null,
            showModal: false
        }
    }

    componentDidMount() {
        const { authToken, searchUsers } = this.props
        searchUsers(authToken)
    }

    getRequestData = () => {
        return (this.props.requests || []).map((request) => {
            return (
                <Request
                    key={request.user.email}
                    userName={
                        request.user.first_name + ' ' + request.user.last_name
                    }
                    email={request.user.email}
                    designation={
                        request.user.company_name
                            ? request.user.company_name
                            : 'Student'
                    }
                    companyName={
                        request.user.job_role ? request.user.job_role : ''
                    }
                    country={
                        request.user.country ? request.user.country : 'India'
                    }
                    openModal={(modalEmail) => {
                        this.setState({ modalEmail, showModal: true })
                    }}
                    isVerified={this.props.isVerified}
                />
            )
        })
    }

    render() {
        const { authToken } = this.props
        const { modalEmail, showModal } = this.state
        const requests = this.getRequestData()
        return (
            <div>
                <RefereeModal
                    token={authToken}
                    modalEmail={modalEmail}
                    showModal={showModal}
                    closeModalCallback={() => {
                        this.setState({ showModal: false, modalEmail: null })
                    }}
                />
                <div
                    className={styles.RequestBox}
                    style={{
                        borderRadius: inlineStyles.borderRadius,
                        backgroundColor: colors.background,
                        margin: 'auto',
                        color: colors.dark,
                        paddingBottom: '70px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <h1>Requests</h1>
                    {requests}
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
        searchUsers: (token) => {
            return dispatch(getRequestListAsync(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestBox)
