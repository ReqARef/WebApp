import React, { PureComponent } from 'react'
import styles from './VideoSection.module.css'

export default class VideoSection extends PureComponent {
	render () {
		return (
			<div className={styles.heroContainer}>
				<video src={this.props.src} autoPlay loop muted />
				<h1>ReqARef</h1>
				<p>Referals await. What are you waiting for?</p>
			</div>
		)
	}
}
