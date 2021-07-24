import React, { PureComponent } from 'react'
import colors from '../../../utils/colors'
import styles from './Companies.module.css'
import { companyLogoArray } from '../../../utils/constants'

export default class Companies extends PureComponent {
    renderHeading = () => {
        return (
            <div
                style={{
                    color: colors.fontcolorWhite,
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '3.5vh'
                }}
            >
                Get referred to companies like
            </div>
        )
    }

    renderImages = () => {
        return (
            <div
                className={styles.navItems}
                ref={this.navRef}
                style={{ backgroundColor: colors.blue }}
            >
                {companyLogoArray.map((url, index) => {
                    return (
                        <img
                            src={url}
                            alt="test"
                            className={styles.image}
                            key={index}
                        />
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div
                className={styles.container}
                style={{ backgroundColor: colors.blue }}
            >
                {this.renderHeading()}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {this.renderImages()}
                </div>
            </div>
        )
    }
}
