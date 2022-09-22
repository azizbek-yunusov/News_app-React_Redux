// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import ReduxThunk from 'redux-thunk';
import newsReducer from '../components/newsList/newsReducer_slice';
import filterReducer from './reducers/filterReducer';

// Middleware                        next - bu dispatch
const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next 
  }
  return next(action)
}

export const store = configureStore({
  reducer: {newsReducer, filterReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production"
})

// export const store = createStore(
//   combineReducers({ newsReducer, filterReducer }),
//   compose(applyMiddleware(ReduxThunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


// strore enhencer
// const enhencer = (createStore) => (...args) => {
//   const store = createStore(...args);
//   const oldDispatch = store.dispatch;
//   store.dispatch = (action) => {
//     if(typeof action === "string") {
//       return oldDispatch({type: action})
//     }
//     return oldDispatch(action)
//   }
//   return store
// }