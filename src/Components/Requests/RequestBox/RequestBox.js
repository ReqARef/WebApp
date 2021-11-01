import React from 'react'
import colors from '../../../utils/colors'
import inlineStyles from '../../../utils/styleConstants'
import style from './RequestBox.module.css'
import { handleRequestAsync } from '../../../store/actions/Request'
import { useDispatch } from 'react-redux'
import { imagePlaceHolder } from '../../../utils/constants'
import styles from './RequestBox.module.css'

const requestBox = (props) => {
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

    const renderNameAndDetails = () => {
        let url = props.url
        if (url) {
            if (!url.includes('http')) {
                url = 'http://' + url
            }
            if (url.charAt(url.length - 1) !== '/') {
                url = url + '/'
            }
        }
        const comment = props.comment || ''
        return (
            <div className={style.UserData}>
                <h3
                    className={style.userDataPara}
                    onClick={() => {
                        props.openModal(props.email)
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    {props.userName}
                </h3>

                {props.url ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={style.userDataPara}>{'Job Id:'}</div>
                        <a
                            className={style.url}
                            href={url}
                            style={{ color: colors.blue, marginLeft: '2px' }}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {props.jobId}
                        </a>
                    </div>
                ) : (
                    <div className={style.userDataPara}>
                        {'Job Id: ' + props.jobId}
                    </div>
                )}
                <div className={style.userDataPara}>{comment}</div>
            </div>
        )
    }

    const renderAcceptRejectButtons = () => {
        return (
            <div className={style.ButtonDiv}>
                <div
                    className={style.button}
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
                    className={style.button}
                    onClick={handleRejectOnClick}
                >
                    Reject
                </div>
            </div>
        )
    }

    const { requestType, role } = props
    const className =
        requestType === 'pending' && role == 1
            ? styles.RequestWide
            : styles.Request
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
            className={className}
        >
            <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
                {renderAvatar()}
                {renderNameAndDetails()}
            </div>
            {role == 1 &&
                requestType === 'pending' &&
                renderAcceptRejectButtons()}
        </div>
    )
}

export default requestBox
