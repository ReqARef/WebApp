import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUserStats } from '../../store/actions/Statistics'
import { Chart } from 'react-google-charts'
import styles, { borderRadius } from '../../utils/styleConstants'
import style from './Statistics.module.css'
import colors from '../../utils/colors'
import Loader from '../Loader/Loader'

class Stats extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showLoader: true
        }
        this.getUserStats()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.role !== this.props.role) {
            this.getUserStats()
        }
    }

    getUserStats = () => {
        const { getStats, authToken } = this.props
        getStats(authToken, () => {
            this.setState({ showLoader: false })
        })
    }

    renderNoStats = () => {
        return (
            <div style={{ color: colors.fontcolorBlack }}>
                Nothing to display
            </div>
        )
    }

    renderChart = () => {
        let userStats = null
        const refStats = this.props.userStats
        if (refStats) {
            if (refStats.requestCount > 0) {
                userStats = (
                    <Chart
                        width={'300px'}
                        height={'300px'}
                        chartType="PieChart"
                        data={[
                            ['RequestStatus', 'requestCount'],
                            ['Accepted', refStats.acceptedRequests],
                            ['Pending', refStats.pendingRequests],
                            ['Rejected', refStats.rejectedRequests]
                        ]}
                        options={{
                            backgroundColor: colors.white,
                            legend: 'none',
                            chartArea: {},
                            is3D: true
                        }}
                    />
                )
            }
        }
        return userStats
    }

    render() {
        const { showLoader } = this.state
        const { role } = this.props
        const userStats = this.renderChart()

        return (
            <div
                className={style.containerMain}
                style={{
                    borderRadius,
                    backgroundColor: colors.white
                }}
            >
                {showLoader && (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Loader />
                    </div>
                )}
                {!showLoader && (
                    <h3
                        style={{
                            color: colors.fontColorBlue,
                            marginTop: '32px'
                        }}
                        className={styles.heading}
                    >
                        {'Statistics of Requests ' +
                            (role == 0 ? 'Sent' : 'Received')}
                    </h3>
                )}
                {!showLoader &&
                    (userStats != null ? userStats : this.renderNoStats())}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authToken: state.User.authToken,
        userStats: state.StatsReducer.userStats,
        role: state.User.user.role
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStats: (token, callback) => dispatch(getUserStats(token, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
