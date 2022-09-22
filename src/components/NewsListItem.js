import React from "react";

function NewsListItem({ name, description, category, onDelete }) {
  let elementClassName;
  switch (category) {
    case "good News":
      elementClassName = "bg-yellow-600";
      break;
    case "sport News":
      elementClassName = "bg-green-600";
      break;
    case "hot News":
      elementClassName = "bg-red-800";
      break;
    default:
      elementClassName = "bg-blue-800";
  }
  return (
    <li
      className={`xl:w-96  h-24 mt-5 p-2 overflow-hidden ${elementClassName}`}
    >
      <div className="relative">
        <div
          onClick={onDelete}
          className="close selection:inset-0 cursor-pointer absolute top-0 right-0 z-50 bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 selection:inset-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-lg text-red-50 selection:inset-0">{name}</h1>
        <p className="text-sm text-indigo-100 selection:inset-0">
          {description}
        </p>
      </div>
    </li>
  );
}

export default NewsListItem;
