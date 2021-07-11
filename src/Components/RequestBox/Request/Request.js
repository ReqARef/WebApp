import React from 'react'
import colors from '../../../utils/colors'
import inlineStyles from '../../../utils/styleConstants'
import style from './Request.module.css'
import { handleRequestAsync } from '../../../store/actions/Request'
import { useDispatch } from 'react-redux'

const request = (props) => {
    const dispatch = useDispatch()

    const { isVerified } = props
    const handleAcceptOnClick = () => {
        if (!isVerified) {
            alert('Please verify your email to continue using ReqARef')
        } else {
            props.updated()
            dispatch(
                handleRequestAsync(
                    props.token,
                    props.requestId,
                    'accept',
                    props.hideLoader
                )
            )
        }
    }
    const handleRejectOnClick = () => {
        if (!isVerified) {
            alert('Please verify your email to continue using ReqARef')
        } else {
            props.updated()
            dispatch(
                handleRequestAsync(
                    props.token,
                    props.requestId,
                    'reject',
                    props.hideLoader
                )
            )
        }
    }

    return (
        <div
            style={{
                backgroundColor: colors.white,
                borderRadius: inlineStyles.borderRadius,
                border: '1px solid ' + colors.background,
                display: 'flex',
                alignItems: 'center',
                flex: 1
            }}
            className={style.Request}
        >
            <div style={{ display: 'flex', flex: 1 }}>
                <img
                    src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-business-male-icon-vector-png-image_4187852.jpg"
                    alt="user"
                    className={style.UserImage}
                    onClick={() => {
                        props.openModal(props.email)
                    }}
                />
                <div className={style.UserData}>
                    <h3 className={style.userDataPara}>{props.userName}</h3>
                    <p className={style.userDataPara}>{props.jobId}</p>
                    <a className={style.userDataCountry}>{props.country}</a>
                </div>
            </div>
            <div className={style.ButtonDiv}>
                <div
                    className={style.AcceptDiv}
                    style={{
                        backgroundColor: colors.dark,
                        color: colors.white,
                        borderRadius: inlineStyles.borderRadius,
                        cursor: 'pointer'
                    }}
                    onClick={handleAcceptOnClick}
                >
                    Accept
                </div>
                <div
                    style={{
                        backgroundColor: colors.background,
                        color: colors.dark,
                        borderRadius: inlineStyles.borderRadius,
                        cursor: 'pointer'
                    }}
                    className={style.RejectDiv}
                    onClick={handleRejectOnClick}
                >
                    Reject
                </div>
            </div>
        </div>
    )
}

export default request
