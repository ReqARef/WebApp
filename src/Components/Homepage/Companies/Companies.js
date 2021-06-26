import React, { PureComponent } from 'react';
import colors from '../../../utils/colors'
import styles from './Companies.module.css'

const LOGO_URLS = [
	'https://1000logos.net/wp-content/uploads/2016/11/Cisco-logo.png',
	'https://logos-download.com/wp-content/uploads/2019/06/Amdocs_Logo.png',
	'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/RBL_Bank_SVG_Logo.svg/1280px-RBL_Bank_SVG_Logo.svg.png',
	'https://smartenergycc.org/wp-content/uploads/2019/11/SEW-Logo-MS19.jpg'
]
export default class Companies extends PureComponent {

	renderImages = () => {
		return (
			<div>
				{LOGO_URLS.map((url, index) => {
					return (
						<img src={url} alt="test" className={styles.image} key={index}/>
					)
				})}
			</div>
		)
	}

	render() {
		return(
			<div className={styles.container} style={{backgroundColor: colors.background}}>
				<h1 style={{color: colors.dark}}>Get referred to companies like</h1>
				{this.renderImages()}
			</div>
		)
	}
}