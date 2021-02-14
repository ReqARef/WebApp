import React from 'react';
import colors from '../../../utils/colors'
import inlineStyles from '../../../utils/styleConstants'
import style from './Request.module.css'
const request = () => {
	return (
		<div style={{
			backgroundColor  : colors.white,
			borderRadius : inlineStyles.borderRadius,
			border : "1px solid " + colors.background
		}}
			className={style.Request}
		>
			<img src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-business-male-icon-vector-png-image_4187852.jpg" alt="user"
				className={style.UserImage}
			></img>
			<div className={style.UserData}>
				<h3>Rohit Salwan</h3>
				<p>SDE-1, Amdocs</p>
				<p>India</p>
			</div>
			<div className={style.ButtonDiv}>
				<div className={style.AcceptDiv}
					style={{
						backgroundColor : colors.acceptButtonColor,
						borderRadius : inlineStyles.borderRadius
					}}
				>
					Accept
				</div>
				<div style={{
					backgroundColor : colors.rejectButtonColor,
					borderRadius : inlineStyles.borderRadius
				}}
				className={style.RejectDiv}>
					Reject
				</div>
			</div>
		</div>
	)
}

export default request;