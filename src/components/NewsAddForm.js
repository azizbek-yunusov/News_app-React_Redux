import React from "react";
import { useState } from "react";
import { useHttp } from "../hook/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { newsCreated } from "./newsList/newsReducer_slice";
import { v4 as uuidv4 } from "uuid";

function NewsAddForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { filters, filterLoadingStatus } = useSelector(
    (state) => state.filterReducer
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newNews = { id: uuidv4(), name, description, category };
    request("http://localhost:3001/news", "POST", JSON.stringify(newNews))
      .then((res) => console.log("success"))
      .then(dispatch(newsCreated(newNews)))
      .catch((err) => console.log(err));

    setName("");
    setDescription("");
    setCategory("");
  };
  const renderFilters = (filters, status) => {
    if (status === "loading") {
      return <option>loading options</option>;
    } else if (status === "error") {
      return <option>error</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        // eslint-disable-next-line array-callback-return
        if (name === "all") return;
        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };
  return (
    <form
      action=""
      className=" bg-slate-300 block w-96"
      onSubmit={onSubmitHandler}
    >
      <label className="block p-2">
        <span className="text-gray-700">Input</span>
        <input
          required
          type="text"
          id="name"
          className="form-input mt-1 block w-full outline-none h-12"
          placeholder="news name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="block p-2">
        <span className="text-gray-700">Textarea</span>
        <textarea
          required
          id="text"
          className="form-textarea mt-1 block w-full outline-none"
          rows="3"
          placeholder="Enter some long form content."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <div className="block p-2">
        <span className="text-gray-700">category</span>
        <div className="mb-3 w-full">
          <select
            className="form-select appearance-none block w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            name="category"
            id="catergory"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option selected>all</option>
            {renderFilters(filters, filterLoadingStatus)}
          </select>
        </div>
      </div>
      <button type="submit" className="bg-black px-3 py-1 text-white">
        create news
      </button>
    </form>
  );
}

export default NewsAddForm;
