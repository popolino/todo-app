import React from "react";
import "src/assets/scss/reset.scss";
import "./assets/scss/global.scss";
import Main from "./features/main/Main";
import Settings from "./features/settings/Settings";
import Friends from "./features/friends/Friends";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Categories from "./features/categories/Categories";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="tasks" element={<Main />} />
        <Route path="/" element={<Main />} />
        <Route path="settings" element={<Settings />} />
        <Route path="friends" element={<Friends />} />
        <Route path="categories" element={<Categories />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
export default Router;
