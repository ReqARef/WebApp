import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import styles from './Modal.module.css'
import Aux from '../../Hoc/Auxiliary'

const modal = (props) => {
	return (
		<Aux>
			<Backdrop show={props.show} clicked={props.closeModal}></Backdrop>
			<div className={styles.Modal}
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0'
				}}>
				{props.children}
			</div>
		</Aux>
	)
}

export default modal
