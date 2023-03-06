import React from "react";
import "src/assets/scss/reset.scss";
import "./assets/scss/global.scss";
import Header from "./features/main/header/Header";
import Main from "./features/main/Main";
import Settings from "./features/settings/Settings";
import Friends from "./features/friends/Friends";

function App() {
  return (
    <div>
      <Header />
      <Main />
      {/*<Settings />*/}
      {/*<Friends/>*/}
      {/*<SideBar />*/}
    </div>
  );
}

export default App;
