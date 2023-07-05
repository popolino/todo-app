import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../features/main/header/Header";
import Navigation from "../features/navigation/Navigation";
import clsx from "clsx";
import Reveal from "../features/reveal/Reveal";
import { useBoundActions } from "../app/store";
import {
  authorizationActions,
  fetchLogout,
} from "../features/authorization/Authorization.slice";
import { useAppSelector } from "../app/hooks";

const allActions = {
  fetchLogout,
  ...authorizationActions,
};
const PrivateLayout = () => {
  const boundActions = useBoundActions(allActions);

  const isAuth = useAppSelector((state) => state.authorizationReducer.isAuth);

  const [isMobile, setMobile] = useState(window.innerWidth <= 500);
  const [open, setOpen] = useState(false);

  window.addEventListener("resize", () => {
    setMobile(window.innerWidth <= 500);
  });

  const onLogout = () => {
    boundActions.fetchLogout();
  };

  return (
    <main className={clsx({ ["open"]: isMobile && open })}>
      <Navigation
        persistent={isMobile}
        open={open}
        setOpen={setOpen}
        onLogout={onLogout}
      />
      <div className="wrapper">
        <Header onOpen={() => setOpen(true)} />
        <div className="scroll main-container">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
export default PrivateLayout;
