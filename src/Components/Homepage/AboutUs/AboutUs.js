import React, { PureComponent } from 'react'
import colors from '../../../utils/colors'
import styles from './AboutUs.module.css'

export default class AboutUs extends PureComponent {
    renderText = () => {
        let text =
            'This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. '
        text = text + text + text + text
        return (
            <div
                style={{
                    color: colors.fontcolorBlack,
                    fontWeight: '500',
                    paddingLeft: '100px',
                    paddingRight: '100px'
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
                <h1 style={{ color: colors.fontColorBlue }}>About Us</h1>
                {this.renderText()}
            </div>
        )
    }
}
