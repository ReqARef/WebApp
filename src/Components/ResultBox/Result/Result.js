import React, { PureComponent } from 'react'
import style from './Result.module.css';
import inlineStyles from '../../../utils/styleConstants'
import colors from '../../../utils/colors'
import { connect } from 'react-redux';

class Result extends PureComponent{
	render(){
		return(
			<div className={style.Result}
				style={{
					borderRadius : inlineStyles.borderRadius
				}}
				
			>
				<img src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-business-male-icon-vector-png-image_4187852.jpg" alt="user"
					className={style.UserImage}
				></img>
				<h2 style={{
					margin : 0
				}}>User Name</h2>
				<p style={{
					margin : 1
				}}>Designation</p>
				<p style={{
					margin : 1
				}}>CompanyName</p>
				<div className={style.RequestButton}
					style={{
						backgroundColor : colors.dark,
						borderRadius : inlineStyles.borderRadius
					}}
					onClick={this.props.showModal}
				>Request</div>
			</div>
			)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onRequestButtonClick : () => dispatch({type : "SHOWPOPUP"})
	}
}
export default connect(null, mapDispatchToProps)(Result);