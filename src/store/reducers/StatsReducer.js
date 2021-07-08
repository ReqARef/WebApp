const initialState = {
    userStats: null
}

const setStats = (state, stats) => {
    const newState = { ...state }
    newState.userStats = stats
    return newState
}
const StatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SETSTATS':
            return setStats(state, action.response.stats)
        default:
            return state
    }
}

export default StatsReducer
