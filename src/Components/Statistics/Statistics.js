import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUserStats } from '../../store/actions/Statistics'
import { Chart } from 'react-google-charts'
import { borderRadius } from '../../utils/styleConstants'
import style from './Statistics.module.css'
import colors from '../../utils/colors'
import Loader from '../Loader/Loader'

class Stats extends PureComponent {
    componentDidMount() {
        const { getStats, authToken } = this.props
        getStats(authToken)
    }

    render() {
        let userStats = null
        const refStats = this.props.userStats
        if (refStats) {
            if (refStats.requestCount > 0) {
                userStats = (
                    <Chart
                        width={'100%'}
                        height={'285px'}
                        chartType="PieChart"
                        data={[
                            ['RequestStatus', 'requestCount'],
                            ['Accepted Request', refStats.acceptedRequests],
                            ['Pending Request', refStats.pendingRequests],
                            ['Rejected Request', refStats.rejectedRequests]
                        ]}
                        options={{
                            backgroundColor: colors.white,
                            legend: 'none',
                            chartArea: {
                                left: '10px',
                                top: 0,
                                bottom: 0,
                                width: '70%',
                                height: '70%'
                            }
                        }}
                    />
                )
            }
        }

        const renderNoStats = () => {
            return (
                <div style={{ color: colors.fontcolorBlack }}>
                    Nothing to display
                </div>
            )
        }

        const { showLoader } = this.props

        return (
            <div
                className={style.containerMain}
                style={{
                    borderRadius,
                    backgroundColor: colors.white,
                    textAlign: 'center',
                    paddingBottom: '15px',
                    height: '46.5vh'
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
                    <h2 style={{ color: colors.fontColorBlue }}>
                        Request Statistics
                    </h2>
                )}
                {!showLoader &&
                    (userStats != null ? userStats : renderNoStats())}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authToken: state.User.authToken,
        userStats: state.StatsReducer.userStats,
        showLoader: state.User.showLoader
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStats: (token) => dispatch(getUserStats(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
