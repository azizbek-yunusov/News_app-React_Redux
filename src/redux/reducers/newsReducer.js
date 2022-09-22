import { createReducer } from "@reduxjs/toolkit"
import { newsFetching, newsFetched, newsFetchingError, newsCreated, newsDeleted } from "../action"

const initialState = {
  news: [],
  newsLoadingStatus: 'loading_false'
}

const newsReducer = createReducer(initialState, builder => {
  builder
    .addCase(newsFetching, (state, action) => {
      state.newsLoadingStatus = 'loading_true';
    })
    .addCase(newsFetched, (state, action) => {
      state.newsLoadingStatus = 'loading_false';
      state.news = action.payload;
    })
    .addCase(newsFetchingError, (state, action) => {
      state.newsLoadingStatus = 'error'
    })
    .addCase(newsCreated, (state, action) => {
      state.news.push(action.payload)
    })
    .addCase(newsDeleted, (state, action) => {
      state.news = state.news.filter(s => s.id !== action.payload)
    })
    .addCase(() => {})
})

// const newsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "NEWS_FETCHING":
//       return {
//         ...state,
//         newsLoadingStatus: 'loading_true'
//       }
//     case "NEWS_FETCHED":
//       return {
//         ...state,
//         news: action.payload,
//         newsLoadingStatus: 'loading_false'
//       }
//     case "NEWS_FETCHING_ERROR":
//       return {
//         ...state,
//         newsLoadingStatus: "error"
//       }
//     case "NEWS_CREATED":
//       return {
//         ...state,
//         news: [...state.news, action.payload]
//       }
//     case "NEWS_DELETED":
//       return {
//         ...state,
//         news: state.news.filter(s => s.id !== action.payload)
//       }
//     default:
//       return state
//   }
// }

export default newsReducer;