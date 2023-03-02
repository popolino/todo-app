import { TextField } from "@mui/material";
import React from "react";
import classes from "./Settings.module.scss";

const Settings = () => (
  <div className="main-container">
    <div className="container">
      <div className="chapter">Settings</div>
      <div className="title">ACCOUNT</div>
      <div className={classes["account-form"]}>
        <div className={classes.circle} />
        <div className={classes.form}>
          <div className="input">
            <TextField id="outlined-textarea" label="Placeholder" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Settings;
