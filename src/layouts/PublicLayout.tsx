import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../features/main/header/Header";
import Navigation from "../features/navigation/Navigation";
import clsx from "clsx";

const PublicLayout = () => {
  const [isMobile, setMobile] = useState(window.innerWidth <= 500);
  const [open, setOpen] = useState(false);
  window.addEventListener("resize", () => {
    setMobile(window.innerWidth <= 500);
  });
  return (
    <main className={clsx({ ["open"]: isMobile && open })}>
      <Navigation
        persistent={isMobile}
        open={open}
        onClose={() => setOpen(false)}
      />
      <div className="scroll main-container">
        <Header onOpen={() => setOpen(true)} />
        <Outlet />
      </div>
    </main>
  );
};
export default PublicLayout;
