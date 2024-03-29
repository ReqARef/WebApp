import React, { PureComponent } from 'react'
import ReactModal from 'react-modal'
import { getRequest } from '../../utils/apiHelpers'
import colors from '../../utils/colors'
import Loader from '../Loader/Loader'
import './UserInfoModal.css'
import { countryCodeToCountry } from '../../utils/helperFunctions'
import { connect } from 'react-redux'
import { imagePlaceHolder } from '../../utils/constants'

class UserInfoModal extends PureComponent {
    constructor(props) {
        super(props)
        const { showModal } = props
        this.state = {
            showModal,
            data: null
        }
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    capitalize = (string) => {
        const stringSplit = string.split(' ')
        let capitalWord = ''
        for (let i = 0; i < stringSplit.length; i++) {
            const word = stringSplit[i]
            capitalWord =
                capitalWord +
                word.substring(0, 1).toUpperCase() +
                word.substring(1) +
                ' '
        }
        return capitalWord.trim()
    }

    handleOpenModal = () => {
        this.setState({ showModal: true })
    }

    handleCloseModal() {
        const { closeModalCallback } = this.props
        this.setState({ showModal: false, data: null })
        closeModalCallback()
    }

    loadData = () => {
        const { token, dispatch, modalEmail } = this.props
        const auth = 'Bearer '.concat(token)
        const headers = { Authorization: auth }

        const resolve = (json) => {
            if (!json.status) {
                this.setState({ showLoader: false, data: null })
            }
            this.setState({ data: json.data })
        }
        const reject = (e) => {
            this.setState({ showLoader: false, data: null })
        }
        const url = `/search/user/email/${modalEmail}`
        getRequest(url, resolve, reject, headers, dispatch, true)
    }

    renderLoader = () => {
        return <Loader height="50px" width="50px" />
    }

    renderImagePlaceholder = () => {
        const { avatar } = this.state.data
        const img =
            avatar &&
            btoa(
                new Uint8Array(avatar.data).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte)
                }, '')
            )
        const imageTemplateURL = imagePlaceHolder
        const source = avatar
            ? `data:image/png;base64,${img}`
            : imageTemplateURL
        return (
            <img
                src={source}
                alt="user"
                style={{
                    height: '160px',
                    width: '160px',
                    borderRadius: '10px'
                }}
            />
        )
    }

    renderNameAndCountry = () => {
        const {
            data: { first_name: firstName, last_name: lastName, country }
        } = this.state
        if (!firstName) return null
        let fullname = this.capitalize(firstName)
        if (lastName) fullname = fullname + ' ' + this.capitalize(lastName)
        let countryName = ''
        if (country) countryName = ', ' + countryCodeToCountry(country)
        return (
            <div
                style={{ display: 'flex', fontSize: '18px', marginTop: '8px' }}
            >
                {fullname + countryName}
            </div>
        )
    }

    renderCompany = () => {
        let {
            data: { company_name: companyName }
        } = this.state
        if (!companyName) return null
        companyName = this.capitalize(companyName)
        return (
            <div
                style={{ display: 'flex', fontSize: '18px', marginTop: '8px' }}
            >
                {companyName}
            </div>
        )
    }

    renderExperience = () => {
        const {
            data: { experience }
        } = this.state
        if (!experience) return null
        return (
            <div
                style={{ display: 'flex', fontSize: '18px', marginTop: '8px' }}
            >
                {'Experience of around ' + experience}
            </div>
        )
    }

    renderCollege = () => {
        const {
            data: { college }
        } = this.state
        if (!college) return null
        return (
            <div
                style={{
                    display: 'flex',
                    fontSize: '18px',
                    marginTop: '8px',
                    textAlign: 'center'
                }}
            >
                {this.capitalize(college)}
            </div>
        )
    }

    renderBio = () => {
        const {
            data: { bio }
        } = this.state
        if (!bio) return null
        return (
            <div
                style={{
                    display: 'flex',
                    fontSize: '18px',
                    marginTop: '8px',
                    textAlign: 'center'
                }}
            >
                {'Bio: ' + bio}
            </div>
        )
    }

    renderResumeLink = () => {
        const {
            data: { resume }
        } = this.state
        if (!resume) {
            return <div style={{ marginTop: '20px' }}>Resume not uploaded</div>
        }
        return (
            // eslint-disable-next-line react/jsx-no-target-blank
            <a
                href={resume}
                target="_blank"
                style={{
                    display: 'flex',
                    fontSize: '18px',
                    marginTop: '8px',
                    color: 'inherit',
                    fontWeight: 'bolder'
                }}
            >
                {'Resume'}
            </a>
        )
    }

    renderContent = () => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {this.renderImagePlaceholder()}
                {this.renderNameAndCountry()}
                {this.renderCompany()}
                {this.renderExperience()}
                {this.renderCollege()}
                {this.renderBio()}
                {this.renderResumeLink()}
            </div>
        )
    }

    renderModal = () => {
        const { data } = this.state
        return (
            <ReactModal
                isOpen={this.state.showModal}
                contentLabel="Minimal Modal Example"
                closeTimeoutMS={1000}
                ariaHideApp={false}
                style={{
                    content: {
                        color: colors.fontcolorBlack,
                        height: '400px',
                        maxWidth: '280px',
                        width: '60%',
                        margin: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        backgroundColor: colors.white,
                        borderRadius: '16px'
                    }
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        top: '0px',
                        display: 'flex',
                        flexDirection: 'row-reverse'
                    }}
                >
                    <div
                        onClick={this.handleCloseModal}
                        style={{
                            marginRight: '16px',
                            marginTop: '16px',
                            backgroundColor: colors.black,
                            color: colors.fontcolorWhite,
                            height: '32px',
                            width: '32px',
                            borderRadius: '32px',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow:
                                'rgba(100, 100, 111, 0.75) 0px 10px 29px 0px'
                        }}
                    >
                        X
                    </div>
                </div>
                {data == null && this.renderLoader()}
                {data != null && this.renderContent()}
            </ReactModal>
        )
    }

    render() {
        const { showModal } = this.props
        const { data } = this.state
        if (this.state.showModal !== showModal) this.setState({ showModal })
        if (showModal && data == null) {
            this.loadData()
        }
        return <div>{showModal && this.renderModal()}</div>
    }
}

// DONT REMOVE: Connect is used to get access to dispatch
export default connect(null, null)(UserInfoModal)
