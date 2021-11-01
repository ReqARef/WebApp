import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import styles from './Modal.module.css'
import Aux from '../../Hoc/Auxiliary'

const modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closeModal}></Backdrop>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div
                    className={styles.Modal}
                    style={{
                        transform: props.show
                            ? 'translateY(0)'
                            : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}
                >
                    {props.children}
                </div>
            </div>
        </Aux>
    )
}

export default modal
