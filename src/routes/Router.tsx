import React from "react";
import "src/assets/scss/reset.scss";
import "src/assets/scss/global.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { routes } from "./routes";
import PrivateLayout from "../layouts/PrivateLayout";
import Main from "../features/main/Main";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PublicLayout />}>
        {routes
          .filter((route) => route.public)
          .map((route, i) => (
            <Route
              key={i}
              path={"/" + route.path + (route.param ? `/:${route.param}` : "")}
              element={route.component}
            />
          ))}
      </Route>
      <Route element={<PrivateLayout />}>
        {routes
          .filter((route) => !route.public)
          .map((route, i) => (
            <Route
              key={i}
              path={"/" + route.path + (route.param ? `/:${route.param}` : "")}
              element={route.component}
            />
          ))}
        <Route path="/" element={<Main />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
export default Router;
