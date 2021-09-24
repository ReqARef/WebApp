import React, { PureComponent } from 'react'
// import ReferrerRequests from '../../Components/Requests/ReferrerRequests/ReferrerRequests'
import RefereeRequests from '../../Components/Requests/RefereeRequests/RefereeRequests'
import colors from '../../utils/colors'

class RequestPage extends PureComponent {
    render() {
        return (
            <div
                style={{
                    backgroundColor: colors.background,
                    height: 'auto',
                    paddingTop: '100px'
                }}
            >
                <RefereeRequests />
                {/* <ReferrerRequests /> */}
            </div>
        )
    }
}

export default RequestPage
