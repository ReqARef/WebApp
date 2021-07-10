import React, { PureComponent } from 'react'
import style from './Result.module.css'
import inlineStyles from '../../../utils/styleConstants'
import colors from '../../../utils/colors'

class Result extends PureComponent {
    imageOnClickHandler = () => {
        const { openUserInfoModal, resultEmail } = this.props
        openUserInfoModal(resultEmail)
    }

    render() {
        return (
            <div
                className={style.Result}
                style={{
                    borderRadius: inlineStyles.borderRadius
                }}
            >
                <img
                    src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-business-male-icon-vector-png-image_4187852.jpg"
                    alt="user"
                    className={style.UserImage}
                    onClick={this.imageOnClickHandler}
                    style={{ cursor: 'pointer' }}
                />
                <h2 style={{ margin: 0, color: colors.dark }}>
                    {this.props.name}
                </h2>
                <p style={{ margin: 1, color: colors.dark }}>
                    {this.props.designation}
                </p>
                <p style={{ margin: 1, color: colors.dark }}>
                    {this.props.company}
                </p>
                <div
                    className={style.RequestButton}
                    style={{
                        backgroundColor: colors.dark,
                        borderRadius: inlineStyles.borderRadius,
                        color: colors.white,
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

export default Result
