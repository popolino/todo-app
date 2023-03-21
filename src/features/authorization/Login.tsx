import React from "react";
import to_do_list from "src/img/to_do_list.png";
import clsx from "clsx";
import classes from "./Authorization.module.scss";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

const Login = () => {
  return (
    <>
      <div className={clsx("main-container", classes["auth-wrapper"])}>
        <div className={clsx("container", classes["auth-container"])}>
          <div className={classes["left-side"]}>
            <img src={to_do_list} alt="" />
          </div>
          <div className={classes["right-side"]}>
            <div className={classes.auth}>
              <div className={classes["auth-top"]}>
                <h1>Welcome back</h1>
                <p>Please enter your details</p>
              </div>
              <div>
                <div className={clsx("input", classes.form)}>
                  <TextField label="Email" />
                </div>
                <div className={clsx("input", classes.form)}>
                  <FormControl>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput type="password" label="Password" />
                  </FormControl>
                </div>
                <div className={classes["bottom-container"]}>
                  <div className="checkbox-remember">
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Remember me"
                      />
                    </FormGroup>
                  </div>
                  <a href="#">Forget password?</a>
                </div>
                <button>Login</button>
                <div className={classes["bottom-container"]}>
                  <p>Don’t have an account yet?</p>
                  <a href="#">Sign up</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
