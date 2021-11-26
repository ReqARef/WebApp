import React, { PureComponent } from 'react'
import colors from '../../../utils/colors'
import styles from './AboutUs.module.css'
import instructions from '../../../Assets/images/instructions.png'
import { aboutUsText } from '../../../utils/constants'

export default class AboutUs extends PureComponent {
    renderText = (text, fontSize) => {
        return (
            <div
                style={{
                    color: colors.fontcolorBlack,
                    fontWeight: '500',
                    paddingLeft: '100px',
                    paddingRight: '100px',
                    fontSize,
                    textAlign: 'center'
                }}
            >
                {text}
            </div>
        )
    }

    render() {
        return (
            <div
                className={styles.mainContainer}
                style={{ backgroundColor: colors.white }}
            >
                <h1 style={{ color: colors.fontColorBlue }}>Instructions</h1>
                <img
                    src={instructions}
                    style={{
                        height: '25%',
                        width: '60%',
                        marginTop: '16px'
                    }}
                />
                <h1 style={{ color: colors.fontColorBlue, marginTop: '80px' }}>
                    About Us
                </h1>
                {this.renderText(aboutUsText, '22px')}
            </div>
        )
    }
}
