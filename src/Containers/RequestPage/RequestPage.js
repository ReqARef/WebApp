import React, { PureComponent } from 'react'
import RequestBox from '../../Components/RequestBox/RequestBox'
import colors from '../../utils/colors'

class RequestPage extends PureComponent {
	render () {
		return (
			<div style={{
				backgroundColor: colors.background,
				height: 'auto',
				paddingTop: '100px'
			}}>
				<RequestBox/>
			</div>
		)
	}
}

export default RequestPage
