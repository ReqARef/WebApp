import React,{useState} from 'react'
import styles from './RequestForm.module.css'
import colors from '../../utils/colors'
import inlineStyles from '../../utils/styleConstants'
import { useDispatch , useSelector } from 'react-redux'
import { makeRequestAsync } from '../../store/actions/Request'
const RequestForm = (props) => {
	const dispatch = useDispatch();
	const email = useSelector(state => state).requestReducer.requestTo;
	
	const [jobId, setJobId] = useState("");
	const [jobUrl, setJobUrl] = useState("");
	const [comments, setComments] = useState("");

	function onSubmitHandler(event){
		event.preventDefault();
		dispatch(makeRequestAsync(jobId, jobUrl, comments, email, props.companyName.company_name));
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
					className={styles.inputText}
					onChange={commentsHandler} 
					value={comments}
					style={{ backgroundColor: colors.white, color: colors.dark }} 
					type="text" 
					placeholder="Comments"></input>
				<div className={styles.requestButton}
					style={{
						backgroundColor : colors.dark,
						borderRadius : inlineStyles.borderRadius
					}}
					onClick = {(event) => onSubmitHandler(event)}
				>Submit</div>
			</form>
		</div>
	)
}

export default RequestForm;