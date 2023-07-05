import React, { useEffect } from "react";
import to_do_list from "src/assets/img/to_do_list.png";
import clsx from "clsx";
import classes from "./Authorization.module.scss";
import CustomTextField from "../../components/helperText/CustomTextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useBoundActions } from "../../app/store";
import { useSnackbar } from "notistack";
import { useAppSelector } from "../../app/hooks";
import { fetchCreateUser, authorizationActions } from "./Authorization.slice";

const allActions = {
  fetchCreateUser,
  ...authorizationActions,
};

export type TRegistrationFields = {
  email: string;
  name: string;
  surname: string;
  password: string;
};
const Registration = () => {
  const boundActions = useBoundActions(allActions);
  const { enqueueSnackbar } = useSnackbar();

  const message = useAppSelector((state) => state.authorizationReducer.message);
  const status = useAppSelector((state) => state.authorizationReducer.status);

  const { handleSubmit, control, setValue, watch, formState } =
    useForm<TRegistrationFields>({
      mode: "all",
      defaultValues: { email: "", name: "", surname: "", password: "" },
    });
  const onSubmit: SubmitHandler<TRegistrationFields> = (data) => {
    console.log(data);
    boundActions.fetchCreateUser(data);
  };
  useEffect(() => {
    message &&
      enqueueSnackbar(message, {
        variant: status !== "failed" ? "info" : "error",
      });
  }, [message]);

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
                <h1>Create an account</h1>
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
                      name="name"
                      control={control}
                      rules={{
                        required: "Name is required",
                      }}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <CustomTextField
                          label="Name"
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
                      name="surname"
                      control={control}
                      rules={{
                        required: "Surname is required",
                      }}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => (
                        <CustomTextField
                          label="Surname"
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
                  <button type="submit" disabled={!formState.isValid}>
                    Registration
                  </button>
                </form>
                <div className={classes["bottom-container"]}>
                  <p>Already have one?</p>
                  <a href="/login">Sign in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
