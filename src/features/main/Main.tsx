import React from "react";

import classes from "./Main.module.scss";
import Header from "./header/Header";
import Tasks from "./tasks/Tasks";
import Categories from "./categories/Categories";

const Main = () => (
  <div>
    <Header />
    <div className={classes.container}>
      <Categories />
      <Tasks />
    </div>
  </div>
);
export default Main;
