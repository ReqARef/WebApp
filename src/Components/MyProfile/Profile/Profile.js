import React, { PureComponent } from 'react'
import styles from './Profile.module.css'
import colors from '../../../utils/colors'
import { borderRadius } from '../../../utils/styleConstants'
import { connect } from 'react-redux'
import { countryCodeToCountry } from '../../../utils/helperFunctions'

class Profile extends PureComponent {
    renderAvatar = () => {
        return (
            <div
                className={styles.avatarContainer}
                style={{ backgroundColor: colors.background }}
            ></div>
        )
    }

    renderName = () => {
        const { first_name: firstName, last_name: lastName } = this.props
        const name =
            firstName && lastName ? `${firstName} ${lastName}` : 'Name unknown'
        return (
            <div className={styles.nameText} style={{ color: colors.dark }}>
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
            <div className={styles.locationText} style={{ color: colors.dark }}>
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
                style={{ color: colors.dark }}
            >
                {designation}
            </div>
        )
    }

    renderCollegeName = () => {
        const { college } = this.props
        if (!college || !college.trim()) return null
        return (
            <div className={styles.collegeText} style={{ color: colors.dark }}>
                {college}
            </div>
        )
    }

    renderExperience = () => {
        const { experience } = this.props
        if (!experience || !experience.trim()) return null
        return (
            <div className={styles.collegeText} style={{ color: colors.dark }}>
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
                style={{ color: colors.dark, marginBottom: 30 }}
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
        return (
            <div
                style={{
                    backgroundColor: colors.white,
                    borderRadius
                }}
                className={styles.containerMain}
            >
                {this.renderAvatar()}
                {this.renderDetails()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.User.user
    }
}

export default connect(mapStateToProps, null)(Profile)
