import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hook/useHttp";

const initialState = {
  news: [],
  newsLoadingStatus: "loading_false",
};

export const fetchNews = createAsyncThunk("newsReducer/fetchNews", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/news");
});
const newsReducerSlice = createSlice({
  name: "newsReducer",
  initialState: initialState,
  reducers: {
    // newsFetching: state => { state.newsLoadingStatus = 'loading_true' },
    // newsFetched: (state, action) => {
    //   state.newsLoadingStatus = 'loading_false';
    //   state.news = action.payload;
    // }, // EXTRAREDUCERDA BORLIGI UCHUN OCHIRILDI
    // newsFetchingError: state => { state.newsLoadingStatus = 'error' },
    newsCreated: (state, action) => {
      state.news.push(action.payload);
    },
    newsDeleted: (state, action) => {
      state.news = state.news.filter((s) => s.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.newsLoadingStatus = "loading_true";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.newsLoadingStatus = "loading_false";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.newsLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = newsReducerSlice;

export default reducer;
export const {
  newsFetching,
  newsFetched,
  newsFetchingError,
  newsCreated,
  newsDeleted,
} = actions;
