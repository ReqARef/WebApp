import React, { PureComponent } from 'react'
import styles from './ResultBox.module.css'
import Result from './Result/Result'
import Modal from '../Modal/Modal'
import Aux from '../../Hoc/Auxiliary'
import { connect } from 'react-redux'
import RequestForm from '../RequestForm/RequestForm'
import UserInfoModal from '../UserInfoModal/UserInfoModal'
import colors from '../../utils/colors'

class ResultBox extends PureComponent {
    state = {
        modalEmail: null,
        showUserInfoModal: false,
        showPopup: false
    }

    togglePopup = (email) => {
        this.setState({ showPopup: !this.state.showPopup })
        this.props.requestToSetter(email)
    }

    getResultData = () => {
        return (this.props.searchResult || []).map((result) => {
            return (
                <Result
                    showModal={this.togglePopup}
                    name={`${result.first_name} ${result.last_name}`}
                    avatar={result.avatar}
                    key={result.email}
                    designation={result.designation || 'Designation unknown'}
                    company={result.company}
                    click={this.submitButtonHandler}
                    resultEmail={result.email}
                    openUserInfoModal={(modalEmail) => {
                        this.setState({ modalEmail, showUserInfoModal: true })
                    }}
                />
            )
        })
    }

    render() {
        const resultData = this.getResultData()
        let { companyName, authToken } = this.props
        const { showUserInfoModal, modalEmail } = this.state
        if (companyName)
            companyName =
                companyName.substring(0, 1).toUpperCase() +
                companyName.substring(1)
        return (
            <Aux>
                <Modal
                    show={this.state.showPopup}
                    closeModal={this.togglePopup}
                >
                    <RequestForm companyName={this.props.companyName} />
                </Modal>
                <UserInfoModal
                    token={authToken}
                    modalEmail={modalEmail}
                    showModal={showUserInfoModal}
                    closeModalCallback={() => {
                        this.setState({
                            showUserInfoModal: false,
                            modalEmail: null
                        })
                    }}
                />
                <div
                    style={{
                        width: '100%'
                    }}
                >
                    <h1
                        style={{ marginLeft: '25vw', color: colors.fontcolor1 }}
                    >
                        {companyName + ' Employees'}
                    </h1>
                </div>
                <div className={styles.ResultBox}>{resultData}</div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authToken: state.User.authToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestToSetter: (email) =>
            dispatch({ type: 'SETREQUESTTO', email: email })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResultBox)
