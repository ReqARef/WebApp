import React from 'react'
import styles from './RequestForm.module.css'
import colors from '../../utils/colors'
const RequestForm = () => {
	return(
		<div className={styles.requestDiv}>
			<form>
				<input className={styles.inputText} style={{ backgroundColor: colors.white, color: colors.dark }} type="text" placeholder="Job Id"></input>
				<input className={styles.inputText} style={{ backgroundColor: colors.white, color: colors.dark }} type="text" placeholder="Job URL"></input>
				<input className={styles.inputText} style={{ backgroundColor: colors.white, color: colors.dark }} type="text" placeholder="Comments"></input>
			</form>
		</div>
	)
}

export default RequestForm;