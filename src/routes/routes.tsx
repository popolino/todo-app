import React from "react";
import Login from "../features/authorization/Login";
import Registration from "../features/authorization/Registration";
import { Route } from "react-router-dom";
import Main from "../features/main/Main";
import Settings from "../features/settings/Settings";
import Friends from "../features/friends/Friends";
import Categories from "../features/categories/Categories";

export const routes = [
  //Public
  {
    path: "login",
    iconId: "login",
    param: "",
    display: true,
    showOnMobile: false,
    public: true,
    component: <Login />,
  },
  {
    path: "registration",
    iconId: "",
    param: "",
    display: true,
    showOnMobile: false,
    public: true,
    component: <Registration />,
  },
  //Private
  {
    path: "tasks",
    iconId: "",
    param: "",
    display: true,
    showOnMobile: false,
    public: false,
    component: <Main />,
  },
  {
    path: "settings",
    iconId: "",
    param: "",
    display: true,
    showOnMobile: false,
    public: false,
    component: <Settings />,
  },
  {
    path: "friends",
    iconId: "",
    param: "",
    display: true,
    showOnMobile: false,
    public: false,
    component: <Friends />,
  },
  {
    path: "categories",
    iconId: "",
    param: "",
    display: true,
    showOnMobile: false,
    public: false,
    component: <Categories />,
  },
];
