import React, { PureComponent } from 'react'
import ResetPassword from '../../Components/ResetPassword/ResetPassword'
import colors from '../../utils/colors'
import styles from './ResetPassword.module.css'

class ResetPasswordContainer extends PureComponent {
    render() {
        return (
            <div
                className={styles.ResetPassword}
                style={{ backgroundColor: colors.background }}
            >
                <ResetPassword />
            </div>
        )
    }
}

export default ResetPasswordContainer
