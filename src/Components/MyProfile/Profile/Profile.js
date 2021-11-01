import React, { PureComponent } from 'react'
import styles from './Profile.module.css'
import colors from '../../../utils/colors'
import { borderRadius } from '../../../utils/styleConstants'
import { changeAvatar } from '../../../store/actions/User'
import { connect } from 'react-redux'
import { countryCodeToCountry } from '../../../utils/helperFunctions'
import Loader from '../../Loader/Loader'

class Profile extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showImageLoader: false
        }
        this.hiddenFileInput = React.createRef()
    }

    onImageUpload = (event) => {
        event.preventDefault()
        const { email_verified: emailVerified } = this.props
        if (!emailVerified) {
            alert('Please verify your email to continue using ReqARef')
            return
        }
        if (event.target.files && event.target.files[0]) {
            const { sendAvatarChangeReq, authToken } = this.props
            const img = event.target.files[0]
            const imageName = img.name
            if (
                imageName.includes('.png') ||
                imageName.includes('.jpg') ||
                imageName.includes('.jpeg')
            ) {
                const formdata = new FormData()
                formdata.append('avatar', img)
                this.setState({ showImageLoader: true })
                sendAvatarChangeReq(authToken, formdata, () => {
                    this.setState({ showImageLoader: false })
                })
            } else {
                alert('We only support png, jpg and jpeg formats')
            }
        }
    }

    onImageClick = () => {
        this.hiddenFileInput.current.click()
    }

    renderEmptyImage = () => {
        const { showImageLoader } = this.state
        const text = showImageLoader ? <Loader /> : 'Upload Image'
        return (
            <div
                className={styles.avatarContainer}
                style={{
                    backgroundColor: colors.background,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: colors.fontcolorBlack
                }}
                onClick={this.onImageClick}
            >
                {text}
            </div>
        )
    }

    renderAvatar = (img) => {
        return (
            <div>
                <img
                    className={styles.avatarContainer}
                    src={`data:image/png;base64,${img}`}
                    alt="Profile Picture"
                    style={{ cursor: 'pointer' }}
                    onClick={this.onImageClick}
                />
            </div>
        )
    }

    renderImageView = () => {
        const { avatar } = this.props
        const img =
            avatar &&
            btoa(
                new Uint8Array(avatar.data).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte)
                }, '')
            )

        return (
            <div>
                {!avatar && this.renderEmptyImage()}
                {avatar && this.renderAvatar(img)}
                <form>
                    <input
                        type="file"
                        ref={this.hiddenFileInput}
                        onChange={this.onImageUpload}
                        style={{ display: 'none' }}
                        name="avatar"
                    />
                </form>
            </div>
        )
    }

    renderName = () => {
        const { first_name: firstName, last_name: lastName } = this.props
        const name =
            firstName && lastName ? `${firstName} ${lastName}` : 'Name unknown'
        return (
            <div
                className={styles.nameText}
                style={{ color: colors.fontcolorBlack }}
            >
                {name}
            </div>
        )
    }

    renderLocation = () => {
        const { country } = this.props
        if (!country) return null
        const location = countryCodeToCountry(country.trim())
        if (!location) return null

        return (
            <div
                className={styles.locationText}
                style={{ color: colors.fontcolorBlack }}
            >
                {location}
            </div>
        )
    }

    renderDesignation = () => {
        let { job_role: jobRole, company_name: companyName } = this.props
        if (!companyName) return null
        let designation = ''
        companyName =
            companyName.substring(0, 1).toUpperCase() + companyName.substring(1)
        if (companyName.trim()) {
            designation = designation + companyName.trim()
            if (jobRole && jobRole.trim()) {
                designation = designation + `, ${jobRole}`
            }
        }
        return (
            <div
                className={styles.designationText}
                style={{ color: colors.fontcolorBlack }}
            >
                {designation}
            </div>
        )
    }

    renderCollegeName = () => {
        const { college } = this.props
        if (!college || !college.trim()) return null
        return (
            <div
                className={styles.collegeText}
                style={{ color: colors.fontcolorBlack }}
            >
                {college}
            </div>
        )
    }

    renderExperience = () => {
        const { experience } = this.props
        if (!experience || !experience.trim()) return null
        return (
            <div
                className={styles.collegeText}
                style={{ color: colors.fontcolorBlack }}
            >
                {'Experience: ' + experience}
            </div>
        )
    }

    renderBio = () => {
        const { bio } = this.props
        if (!bio || !bio.trim()) return null
        return (
            <div
                className={styles.collegeText}
                style={{ color: colors.fontcolorBlack, marginBottom: 30 }}
            >
                {bio}
            </div>
        )
    }

    renderDetails = () => {
        const { bio } = this.props
        const brStyle = bio && bio.trim() ? styles.br : styles.marginDown
        return (
            <div className={styles.detailsContainer}>
                {this.renderName()}
                {this.renderLocation()}
                {this.renderDesignation()}
                {this.renderCollegeName()}
                {this.renderExperience()}
                <div className={brStyle} />
                {this.renderBio()}
            </div>
        )
    }

    render() {
        const { showLoader } = this.props
        return (
            <div
                style={{
                    backgroundColor: colors.white,
                    borderRadius
                }}
                className={styles.containerMain}
            >
                {!showLoader && this.renderImageView()}
                {!showLoader && this.renderDetails()}
                {showLoader && <Loader />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.User.user,
        authToken: state.User.authToken,
        showLoader: state.User.showLoader
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendAvatarChangeReq: (token, img, callback) => {
            return dispatch(changeAvatar(token, img, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
