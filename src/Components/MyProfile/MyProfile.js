import React, { PureComponent } from 'react'
import Profile from './Profile/Profile'
import Settings from './Settings/Settings'
import styles from './MyProfile.module.css'
import colors from '../../utils/colors'
import Stats from '../Statistics/Statistics'
import { connect } from 'react-redux'
import { setNavbarSelection } from '../../store/actions/Navbar'

class MyProfile extends PureComponent {
    constructor(props) {
        super(props)
        const { setNavbarButtonSelection } = props
        setNavbarButtonSelection('PROFILE')
    }

    render() {
        return (
            <div style={{ backgroundColor: colors.background }}>
                <div
                    style={{ background: colors.white }}
                    className={styles.containerHeader}
                />
                <div className={styles.hiddenContainer}>
                    <Profile />
                    <Stats />
                </div>
                <div className={styles.componentContainer}>
                    <Settings />
                    <div className={styles.RightContainer}>
                        <Profile />
                        <Stats />
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setNavbarButtonSelection: (value) => dispatch(setNavbarSelection(value))
    }
}

export default connect(null, mapDispatchToProps)(MyProfile)
