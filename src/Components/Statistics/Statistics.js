import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUserStats } from '../../store/actions/Statistics'
import { Chart } from 'react-google-charts'
import { borderRadius } from '../../utils/styleConstants'
import colors from '../../utils/colors'

class Stats extends PureComponent {
	constructor (props) {
		console.log('cons')
		super(props)
		const { getStats, authToken } = this.props
		getStats(authToken)
	}

	render () {
		let userStats = null
		const refStats = this.props.userStats
		if (refStats) {
			if (refStats.requestCount > 0) {
				userStats = (
					<Chart
						width={'100%'}
						height={'325px'}
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
				<div style={{ color: colors.dark }}>Nothing to display</div>
			)
		}

		return (
			<div style={{
				borderRadius,
				backgroundColor: colors.white,
				textAlign: 'center',
				paddingBottom: '15px'
			}}>
				<h2 style={{ color: colors.dark }}>Request Statistics</h2>
				{userStats != null ? userStats : renderNoStats()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		authToken: state.User.authToken,
		userStats: state.StatsReducer.userStats
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getStats: (token) => dispatch(getUserStats(token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)
