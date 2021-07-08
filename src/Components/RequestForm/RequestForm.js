import React,{useState} from 'react'
import styles from './RequestForm.module.css'
import colors from '../../utils/colors'
import inlineStyles from '../../utils/styleConstants'
import { useDispatch , useSelector } from 'react-redux'
import { makeRequestAsync } from '../../store/actions/Request'
import Loader from '../Loader/Loader'
const RequestForm = (props) => {
	const dispatch = useDispatch();
	const email = useSelector(state => state).requestReducer.requestTo;
	const showLoader = useSelector(state => state).requestReducer.showLoader;
	const token = useSelector(state => state).User.authToken;
	
	const [jobId, setJobId] = useState("");
	const [jobUrl, setJobUrl] = useState("");
	const [comments, setComments] = useState("");

	function onSubmitHandler(event){
		event.preventDefault();
		if( !jobId || !jobUrl || !comments){
			alert('Fields cannot be empty');
			return;
		}
		dispatch(makeRequestAsync(jobId, jobUrl, comments, email, props.companyName,token,props.showModal));
	}

	function jobIdHandler(event){
		setJobId(event.target.value);
	}

	function jobUrlHandler(event){
		setJobUrl(event.target.value);
	}

	function commentsHandler(event){
		setComments(event.target.value);
	}

	const renderLoader = () => {		
		return <Loader/>;
	}

	const renderSubmitButton = () => {
		return (<div className={styles.requestButton}
			style={{
				backgroundColor : colors.dark,
				borderRadius : inlineStyles.borderRadius,
				cursor: 'pointer'
			}}
			onClick = {(event) => onSubmitHandler(event)}
		>{showLoader ? renderLoader() : "Submit"}</div>);
	}

	return(
		<div className={styles.requestDiv}>
			<h2>ReqARef</h2>
			<form>
				<input 
					className={styles.inputText} 
					onChange={jobIdHandler}
					value={jobId}
					style={{ backgroundColor: colors.white, color: colors.dark }} 
					type="text" 
					placeholder="Job Id"></input>
				<input 
					className={styles.inputText} 
					onChange={jobUrlHandler}
					value={jobUrl}
					style={{ backgroundColor: colors.white, color: colors.dark }} 
					type="text" 
					placeholder="Job URL"></input>
				<input 
					className={styles.inputTextBox}
					onChange={commentsHandler} 
					value={comments}
					style={{ backgroundColor: colors.white, color: colors.dark }} 
					type="text" 
					placeholder="Why you are suitable for the job"></input>
				{renderSubmitButton()}
			</form>
		</div>
	)
}

export default RequestForm;