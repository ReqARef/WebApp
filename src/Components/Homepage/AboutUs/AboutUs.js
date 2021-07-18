import React, { PureComponent } from 'react'
import colors from '../../../utils/colors'
import styles from './AboutUs.module.css'

export default class AboutUs extends PureComponent {
    renderImage = () => {
        return <div className={styles.imageContainer}></div>
    }

    renderText = () => {
        let text =
            'This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. This is a very long text. '
        text = text + text + text + text
        return (
            <div
                style={{ color: colors.fontcolorWhite }}
                className={styles.text}
            >
                {text}
            </div>
        )
    }

    renderInnerBox = () => {
        return (
            <div
                style={{ backgroundColor: colors.blue }}
                className={styles.innerBox}
            >
                <div className={styles.textSection}>
                    <h1
                        style={{ color: colors.fontcolorWhite }}
                        className={styles.heading}
                    >
                        About Us
                    </h1>
                    {this.renderText()}
                </div>
                {this.renderImage()}
            </div>
        )
    }

    render() {
        return (
            <div
                className={styles.mainContainer}
                style={{ backgroundColor: colors.blue }}
            >
                {this.renderInnerBox()}
            </div>
        )
    }
}
