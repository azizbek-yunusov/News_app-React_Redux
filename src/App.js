import React from "react";
import NavBar from "./components/NavBar";
import NewsList from "./components/newsList/NewsList";
import NewsFilter from "./components/NewsFilter";
import NewsAddForm from "./components/NewsAddForm";
import "./assets/style/apply.css";
import bg1 from "./assets/img/bg1.jpg";
import "./assets/style/main.css";

function App() {
  return (
    <div className="xl:min-h-screen">
      <div className="bg xl:block xl:w-full xl:h-full fixed top-0 left-0 -z-10 hidden">
        <img className="xl:z-10 -z-50" src={bg1} alt={bg1} />
      </div>
      <NavBar />
      <div className="content container flex flex-col sm:flex-col mt-5 xl:flex xl:justify-around xl:flex-row">
        <NewsList />
        <div className="content-page">
          <NewsAddForm />
          <NewsFilter />
        </div>
      </div>
    </div>
  );
}

export default App;
