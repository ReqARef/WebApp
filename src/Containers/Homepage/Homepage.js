import React, { PureComponent } from 'react'
import VideoSection from '../../Components/Homepage/VideoSection/VideoSection'
import AboutUs from '../../Components/Homepage/AboutUs/AboutUs'
import Companies from '../../Components/Homepage/Companies/Companies'
import { connect } from 'react-redux'

class CompanySearchResult extends PureComponent {
    render() {
        return (
            <div style={{ marginTop: '10vh' }}>
                <VideoSection src="/videos/video-1.mp4" />
                <Companies />
                <AboutUs />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanySearchResult)
