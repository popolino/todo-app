import React from "react";
import Tasks from "./tasks/Tasks";
import Categories from "./categories/Categories";

const Main = () => (
  <div className="layout">
    <div className="main-container">
      <Categories />
      <Tasks />
    </div>
  </div>
);
export default Main;
