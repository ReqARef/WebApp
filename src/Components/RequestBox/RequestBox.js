import React from 'react';
import styles from './RequestBox.module.css';
import inlineStyles from '../../utils/styleConstants';
import colors from '../../utils/colors';
import Request from './Request/Request'

const requestBox = () => {
	return(
		<div className={styles.RequestBox} style={{
			borderRadius : inlineStyles.borderRadius,
			backgroundColor : colors.background,
			margin : "auto",
			paddingLeft : "70px",
			paddingTop : "30px",
			color : colors.dark,
			paddingBottom : "70px"
			}}>
			<h1>Requests</h1>
			<Request/>
			<Request/>
			<Request/>
			<Request/>

		</div>
	)
}

export default requestBox;