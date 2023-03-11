import React from "react";
import "src/assets/scss/reset.scss";
import "./assets/scss/global.scss";
import Header from "./features/main/header/Header";
import Main from "./features/main/Main";
import Settings from "./features/settings/Settings";
import Friends from "./features/friends/Friends";
import Navigation from "./features/navigation/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main>
          <Navigation persistent={true} />
          <Routes>
            <Route path="tasks" element={<Main />}></Route>
            <Route path="/" element={<Main />}></Route>
            <Route path="settings" element={<Settings />}></Route>
            <Route path="friends" element={<Friends />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default App;
