import React, { PureComponent } from 'react'
import VideoSection from '../../Components/Homepage/VideoSection/VideoSection'
import AboutUs from '../../Components/Homepage/AboutUs/AboutUs'
import Companies from '../../Components/Homepage/Companies/Companies'
import { connect } from 'react-redux'
import { setNavbarSelection } from '../../store/actions/Navbar'

class CompanySearchResult extends PureComponent {
    constructor(props) {
        super(props)
        const { setNavbarButtonSelection } = props
        setNavbarButtonSelection('HOME')
    }

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

function mapDispatchToProps(dispatch) {
    return {
        setNavbarButtonSelection: (value) => dispatch(setNavbarSelection(value))
    }
}

export default connect(null, mapDispatchToProps)(CompanySearchResult)
