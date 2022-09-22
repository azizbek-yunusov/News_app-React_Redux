const initialState = {
  filters: [],
  filterLoadingStatus: 'loading_false',
  activeFilter: "all"
}
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTERS_FETCHING":
      return {
        ...state,
        filterLoadingStatus: 'loading_true'
      }
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filterLoadingStatus: 'loading_false'
      }
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filterLoadingStatus: 'error'
      }
    case "ACTIVE_FILTER_CHANGED":
      return {
        ...state,
        activeFilter: action.payload
      }
    default:
      return state
  }
}

export default filterReducer;