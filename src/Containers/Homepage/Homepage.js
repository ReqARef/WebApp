import React, { PureComponent } from 'react'
import VideoSection from '../../Components/Homepage/VideoSection/VideoSection'
import AboutUs from '../../Components/Homepage/AboutUs/AboutUs'
import Companies from '../../Components/Homepage/Companies/Companies'
// import colors from '../../utils/colors'
// import styles from './Homepage.module.css'
import { connect } from 'react-redux'

class CompanySearchResult extends PureComponent {
	render () {
		return (
			<div>
				<VideoSection src="/videos/video-1.mp4"/>
				<Companies />
				<AboutUs />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {

	}
}

function mapDispatchToProps (dispatch) {
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CompanySearchResult)
