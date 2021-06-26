import React from 'react';
import styles from './Loader.module.css'
const loader = (props) => {
    let {height, width} = props;
    height = height || '20px'
    width = width || '20px'
	return(
		<div style={{height, width}} className={styles.loader}></div>
	)
}

export default loader;