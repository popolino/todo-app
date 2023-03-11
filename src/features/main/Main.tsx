import React from "react";
import Tasks from "./tasks/Tasks";
import Categories from "./categories/Categories";

const Main = () => (
  <div className="layout main-container">
    <Categories />
    <Tasks />
  </div>
);
export default Main;
