import React, { PureComponent } from 'react'
import styles from './VideoSection.module.css'
import homepageMain from '../../../Assets/images/homepage_main.jpg'

export default class VideoSection extends PureComponent {
    render() {
        return (
            <div className={styles.heroContainer}>
                <img src={homepageMain} className={styles.image} />
            </div>
        )
    }
}
