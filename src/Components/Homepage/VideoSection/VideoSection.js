import React, { PureComponent } from 'react'
import colors from '../../../utils/colors'
import styles from './VideoSection.module.css'

export default class VideoSection extends PureComponent {
    render() {
        return (
            <div className={styles.heroContainer}>
                <video src={this.props.src} autoPlay loop muted />
                <h1 style={{ color: colors.fontcolorWhite }}>ReqARef</h1>
                <p style={{ color: colors.fontcolorWhite }}>
                    Referals await. What are you waiting for?
                </p>
            </div>
        )
    }
}
