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
    label: "login",
    iconId: "login",
    param: "",
    display: false,
    public: true,
    component: <Login />,
  },
  {
    path: "registration",
    label: "registration",
    iconId: "",
    param: "",
    display: false,
    public: true,
    component: <Registration />,
  },
  //Private
  {
    path: "tasks",
    label: "tasks",
    iconId: "tasks",
    param: "",
    display: true,
    public: false,
    component: <Main />,
  },
  {
    path: "notifications",
    label: "notifications",
    iconId: "notification",
    param: "",
    display: true,
    public: false,
    component: <div />,
  },
  {
    path: "categories",
    label: "categories",
    iconId: "categories",
    param: "",
    display: true,
    public: false,
    component: <Categories />,
  },
  {
    path: "friends",
    label: "friends",
    iconId: "friends",
    param: "",
    display: true,
    public: false,
    component: <Friends />,
  },
  {
    path: "settings",
    label: "settings",
    iconId: "settings",
    param: "",
    display: true,
    public: false,
    component: <Settings />,
  },
];
