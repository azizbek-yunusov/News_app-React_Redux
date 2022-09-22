import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hook/useHttp";
import Loader from "./Loader";
import classNames from "classnames";
import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} from "../redux/action";

function NewsFilter() {
  const { filters, filterLoadingStatus, activeFilter } = useSelector(
    (state) => state.filterReducer
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch((err) => dispatch(filtersFetchingError()));

    // eslint-disable-next-line
  }, []);

  if (filterLoadingStatus === "loading") {
    return <Loader />;
  } else if (filterLoadingStatus === "error") {
    return <h1>error</h1>;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Filters doesn't found</h5>;
    }
    return arr.map(({ name, label, className }) => {
      const btnClasses = classNames("btn", className, {
        active: name === activeFilter,
      });
      return (
        <button
          key={name}
          id={name}
          className={btnClasses}
          onClick={() => dispatch(activeFilterChanged(name))}
        >
          {label}
        </button>
      );
    });
  };
  const elements = renderFilters(filters);
  return (
    <div>
      <div className="mt-2 bg-red-200">
        <h1 className="text-xl">filter category</h1>
        <div className="mt-2 selection:inset-0">
          {elements}
          {/* <button className='m-1 px-2 py-1 bg-amber-400'>hot News</button>
          <button className='m-1 px-2 py-1 bg-blue-700'>sport News</button>
          <button className='m-1 px-2 py-1 bg-red-400'>good News</button> */}
        </div>
      </div>
    </div>
  );
}

export default NewsFilter;
