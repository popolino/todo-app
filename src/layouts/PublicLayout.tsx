import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../features/main/header/Header";
import Navigation from "../features/navigation/Navigation";
import clsx from "clsx";
import Reveal from "../features/reveal/Reveal";

const PublicLayout = () => {
  const [isMobile, setMobile] = useState(window.innerWidth <= 500);
  const [open, setOpen] = useState(false);
  window.addEventListener("resize", () => {
    setMobile(window.innerWidth <= 500);
  });
  return (
    <main className={clsx({ ["open"]: isMobile && open })}>
      {/*<Reveal />*/}
      <Navigation
        persistent={isMobile}
        open={open}
        onClose={() => setOpen(false)}
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
export default PublicLayout;
