import React from "react";
import { useEffect, useCallback } from "react";
import { useHttp } from "../../hook/useHttp";
import { useSelector, useDispatch } from "react-redux";
// import { fetchNews } from '../../redux/action';
import Loader from "../Loader";
import NewsListItem from "../NewsListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createSelector } from "reselect";
import { newsDeleted, fetchNews } from "./newsReducer_slice";
import "../../assets/style/main.css";

function NewsList() {
  const filteredNewsSelected = createSelector(
    (state) => state.filterReducer.activeFilter,
    (state) => state.newsReducer.news,
    (filterReducer, newsReducer) => {
      if (filterReducer === "all") {
        console.log("render");
        return newsReducer;
      } else {
        return newsReducer.filter((s) => s.category === filterReducer);
      }
    }
  );
  const filteredNews = useSelector(filteredNewsSelected);
  const filterLoadingStatus = useSelector((state) => state.filterLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchNews());
    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback((id) => {
    request(`http://localhost:3001/news/${id}`, "DELETE")
      .then((data) => console.log(data + "deleted"))
      .then(dispatch(newsDeleted(id)))
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);
  if (filterLoadingStatus === "loading_true") {
    return <Loader />;
  } else if (filterLoadingStatus === "error") {
    return <h1 className="red-400">error</h1>;
  }
  const renderNewsList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={500} classNames="item">
          <div className="blue-800 text-7xl">404</div>
        </CSSTransition>
      );
    }
    return arr
      .map(({ id, ...props }) => {
        return (
          <CSSTransition key={id} timeout={500} classNames="item">
            <NewsListItem onDelete={() => onDelete(id)} {...props} />
          </CSSTransition>
        );
      })
      .reverse();
  };
  const element = renderNewsList(filteredNews);

  return (
    <TransitionGroup
      component="ul"
      className="overflow-y-scroll xl:w-[500px] w-full h-[600px] backdrop-blur-sm xl:p-5 list"
    >
      {element}
    </TransitionGroup>
  );
}

export default NewsList;
