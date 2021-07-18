import React from 'react'
import colors from '../../../utils/colors'
import inlineStyles from '../../../utils/styleConstants'
import style from './Request.module.css'
import { handleRequestAsync } from '../../../store/actions/Request'
import { useDispatch } from 'react-redux'
import { imagePlaceHolder } from '../../../utils/constants'

const request = (props) => {
    const dispatch = useDispatch()
    const { isVerified, page } = props

    const handleAcceptOnClick = () => {
        if (!isVerified) {
            alert('Please verify your email to continue using ReqARef')
        } else {
            props.updated()
            dispatch(
                handleRequestAsync(
                    props.token,
                    page,
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
                    page,
                    props.requestId,
                    'reject',
                    props.hideLoader
                )
            )
        }
    }

    const renderAvatar = () => {
        const { avatar } = props
        const img =
            avatar &&
            btoa(
                new Uint8Array(avatar.data).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte)
                }, '')
            )
        const imageTemplateURL = imagePlaceHolder
        const source = avatar
            ? `data:image/png;base64,${img}`
            : imageTemplateURL
        return (
            <img
                src={source}
                alt="user"
                className={style.UserImage}
                onClick={() => {
                    props.openModal(props.email)
                }}
            />
        )
    }

    return (
        <div
            style={{
                backgroundColor: colors.white,
                borderRadius: inlineStyles.borderRadius,
                border: '0px solid ' + 'orange',
                display: 'flex',
                alignItems: 'center',
                flex: 1
            }}
            className={style.Request}
        >
            <div style={{ display: 'flex', flex: 1 }}>
                {renderAvatar()}
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
                        backgroundColor: colors.blue,
                        color: colors.fontcolorWhite,
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
                        color: colors.fontcolorBlack,
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
