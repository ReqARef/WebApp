import React, { PureComponent } from 'react'
import Requests from '../../Components/Requests/Requests'
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
                <Requests />
            </div>
        )
    }
}

export default RequestPage
