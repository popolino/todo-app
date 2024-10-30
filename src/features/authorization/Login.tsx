import React, { useEffect } from "react";
import to_do_list from "src/assets/img/to_do_list.png";
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomTextField from "../../components/helperText/CustomTextField";
import { useBoundActions } from "../../app/store";
import {
  authorizationActions,
  fetchCreateUser,
  fetchLogin,
} from "./Authorization.slice";
import { useAppSelector } from "../../app/hooks";
import { Navigate } from "react-router-dom";

export type TLoginFields = {
  email: string;
  password: string;
  rememberMe: boolean;
};
const allActions = {
  fetchLogin,
  ...authorizationActions,
};
const Login = () => {
  const boundActions = useBoundActions(allActions);
  const isAuth = useAppSelector((state) => state.authorizationReducer.isAuth);
  const { handleSubmit, control, formState, setValue } = useForm<TLoginFields>({
    mode: "all",
    defaultValues: { email: "", password: "", rememberMe: false },
  });
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
    }
  }, [setValue]);
  const onSubmit: SubmitHandler<TLoginFields> = (data) => {
    boundActions.fetchLogin(data);
    if (data.rememberMe) {
      localStorage.setItem("userEmail", data.email);
    } else {
      localStorage.removeItem("userEmail");
    }
  };
  if (isAuth) {
    return <Navigate to={"/"} />;
  }
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={clsx("input", classes.form)}>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        validate: {
                          hasCharsAfterAt: (value) =>
                            /.+./.test(value) ||
                            "Enter the email part before @",
                          hasAtChar: (value) =>
                            /.+@/.test(value) ||
                            "The email address must contain the @ symbol",
                          hasDotChar: (value) =>
                            /.+@.+\..+/i.test(value) ||
                            "Enter the email part after @",
                        },
                      }}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <CustomTextField
                          label="Email"
                          type="input"
                          error={!!error}
                          message={error?.message}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                      )}
                    />
                  </div>{" "}
                  <div className={clsx("input", classes.form)}>
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Minimum 6 symbols",
                        },
                      }}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <CustomTextField
                          label="Password"
                          type="password"
                          error={!!error}
                          message={error?.message}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                      )}
                    />
                  </div>{" "}
                  <div className={classes["remember-container"]}>
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field }) => (
                        <div className="checkbox-remember">
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) =>
                                    field.onChange(e.target.checked)
                                  }
                                  checked={field.value}
                                />
                              }
                              label="Remember me"
                            />
                          </FormGroup>
                        </div>
                      )}
                    />
                    <a href="#">Forget password?</a>
                  </div>
                  <button type="submit" disabled={!formState.isValid}>
                    Login
                  </button>
                </form>
                <div className={classes["bottom-container"]}>
                  <p>Don’t have an account yet?</p>
                  <a href="/registration">Sign up</a>
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
