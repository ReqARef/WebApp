import React, { useState } from 'react'
import styles from './RequestForm.module.css'
import colors from '../../utils/colors'
import inlineStyles from '../../utils/styleConstants'
import { useDispatch, useSelector } from 'react-redux'
import { makeRequestAsync } from '../../store/actions/Request'
import Loader from '../Loader/Loader'

const RequestForm = (props) => {
    const dispatch = useDispatch()
    const email = useSelector((state) => state).requestReducer.requestTo
    const token = useSelector((state) => state).User.authToken

    const [jobId, setJobId] = useState('')
    const [jobUrl, setJobUrl] = useState('')
    const [comments, setComments] = useState('')
    const [showLoader, setLoader] = useState(false)
    const buttonText = showLoader ? <Loader /> : 'Submit'

    function onSubmitHandler(event) {
        if (!jobId || !jobUrl) {
            alert('missing job id or job url')
            return
        }
        setLoader(true)
        event.preventDefault()
        dispatch(
            makeRequestAsync(
                jobId,
                jobUrl,
                comments,
                email,
                props.companyName,
                token,
                setLoader
            )
        )
    }

    function jobIdHandler(event) {
        setJobId(event.target.value)
    }

    function jobUrlHandler(event) {
        setJobUrl(event.target.value)
    }

    function commentsHandler(event) {
        setComments(event.target.value)
    }

    return (
        <div className={styles.requestDiv}>
            <h2>ReqARef</h2>
            <form>
                <input
                    className={styles.inputText}
                    onChange={jobIdHandler}
                    value={jobId}
                    style={{
                        backgroundColor: colors.background,
                        color: colors.fontcolorBlack
                    }}
                    type="text"
                    placeholder="Job Id"
                ></input>
                <input
                    className={styles.inputText}
                    onChange={jobUrlHandler}
                    value={jobUrl}
                    style={{
                        backgroundColor: colors.background,
                        color: colors.fontcolorBlack
                    }}
                    type="text"
                    placeholder="Job URL"
                ></input>
                <input
                    className={styles.inputText}
                    onChange={commentsHandler}
                    value={comments}
                    style={{
                        backgroundColor: colors.background,
                        color: colors.fontcolorBlack
                    }}
                    type="text"
                    placeholder="Comments"
                ></input>
                <div
                    className={styles.requestButton}
                    style={{
                        backgroundColor: colors.blue,
                        color: colors.fontcolorWhite,
                        borderRadius: inlineStyles.borderRadius,
                        cursor: 'pointer'
                    }}
                    onClick={(event) => onSubmitHandler(event)}
                >
                    {buttonText}
                </div>
            </form>
        </div>
    )
}

export default RequestForm
