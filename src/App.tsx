import React from "react";
import "src/assets/scss/reset.scss";
import "./assets/scss/global.scss";
import Settings from "./features/settings/Settings";
import Header from "./features/main/header/Header";

function App() {
  return (
    <div>
      <Header />
      {/*<Main />*/}
      <Settings />
    </div>
  );
}

export default App;
