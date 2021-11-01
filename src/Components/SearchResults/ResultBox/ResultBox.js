import React, { PureComponent } from 'react'
import style from './ResultBox.module.css'
import inlineStyles from '../../../utils/styleConstants'
import colors from '../../../utils/colors'
import { imagePlaceHolder } from '../../../utils/constants'

class ResultBox extends PureComponent {
    imageOnClickHandler = () => {
        const { openUserInfoModal, resultEmail } = this.props
        openUserInfoModal(resultEmail)
    }

    render() {
        const { avatar } = this.props
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
            <div
                className={style.Result}
                style={{
                    borderRadius: inlineStyles.borderRadius
                }}
            >
                <img
                    src={source}
                    alt="Profile Picture"
                    className={style.UserImage}
                    onClick={this.imageOnClickHandler}
                    style={{ cursor: 'pointer' }}
                />
                <h2
                    style={{
                        margin: 0,
                        color: colors.fontcolorBlack,
                        cursor: 'pointer'
                    }}
                    onClick={this.imageOnClickHandler}
                >
                    {this.props.name}
                </h2>
                <p style={{ margin: 1, color: colors.fontcolorBlack }}>
                    {this.props.designation}
                </p>
                <p style={{ margin: 1, color: colors.fontcolorBlack }}>
                    {this.props.company}
                </p>
                <div
                    className={style.RequestButton}
                    style={{
                        backgroundColor: colors.blue,
                        color: colors.fontcolorWhite,
                        cursor: 'pointer'
                    }}
                    onClick={() => this.props.showModal(this.props.resultEmail)}
                >
                    Request
                </div>
            </div>
        )
    }
}

export default ResultBox
