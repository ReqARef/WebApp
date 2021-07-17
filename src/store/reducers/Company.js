const initialState = {
    companyList: [],
    companyListDownloading: true
}

const downloadList = (state, payLoad) => {
    const newState = { ...state }
    newState.companyList = payLoad
    newState.companyListDownloading = false
    return newState
}

const showCompanyLoader = (state) => {
    const newState = { ...state }
    newState.companyListDownloading = true
    return newState
}

const unshowCompanyLoader = (state) => {
    const newState = { ...state }
    newState.companyListDownloading = false
    return newState
}

const CompanyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DOWNLOAD_COMPANY_LIST':
            return downloadList(state, action.payLoad)
        case 'SHOW_COMPANY_LOADER':
            return showCompanyLoader(state)
        case 'UNSHOW_COMPANY_LOADER':
            return unshowCompanyLoader(state)
        default:
            return state
    }
}

export default CompanyReducer
