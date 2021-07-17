import React, { PureComponent } from 'react'
import styles from './FlipBox.module.css'
import ReactCardFlip from 'react-card-flip'
import Login from './Login/Login'
import SignUp from './Signup/Signup'
import { connect } from 'react-redux'
import { setNavbarSelection } from '../../store/actions/Navbar'

class FlipBox extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isFlipped: false
        }
        const { setNavbarButtonSelection } = props
        setNavbarButtonSelection('AUTH')
    }

    handleFlip = (e) => {
        e.preventDefault()
        this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }))
    }

    render() {
        return (
            <div className={styles.main}>
                <ReactCardFlip
                    isFlipped={this.state.isFlipped}
                    flipDirection="horizontal"
                >
                    <Login
                        handleFlip={this.handleFlip}
                        isFlipped={this.state.isFlipped}
                    />
                    <SignUp
                        handleFlip={this.handleFlip}
                        isFlipped={this.state.isFlipped}
                    />
                </ReactCardFlip>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNavbarButtonSelection: (value) => dispatch(setNavbarSelection(value))
    }
}

export default connect(null, mapDispatchToProps)(FlipBox)
