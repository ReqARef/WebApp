import React, { PureComponent } from 'react'
import styles from './Authentication.module.css'
import FlipBox from '../../Components/FlipBox/FlipBox'
import colors from '../../utils/colors'

class Authentication extends PureComponent {
    render() {
        return (
            <div
                className={styles.Authentication}
                style={{ backgroundColor: colors.white }}
            >
                <FlipBox />
            </div>
        )
    }
}
export default Authentication
