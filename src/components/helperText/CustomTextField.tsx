import classes from "./CustomTextField.module.scss";
import React, { useState } from "react";
import clsx from "clsx";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

type TCustomTextFieldProps = {
  className?: string;
  label: string;
  type: "input" | "password";
  message?: string;
  error: boolean;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};
const CustomTextField: React.FC<TCustomTextFieldProps> = ({
  className,
  label,
  message,
  error,
  value,
  type,
  onChange,
  onBlur,
}) => {
  return (
    <div className={classes.wrapper}>
      <div className={className}>
        {type === "input" ? (
          <TextField
            label={label}
            className={clsx({ "input-error": error, input: !error })}
            error
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            autoFocus={false}
            multiline={false}
          />
        ) : (
          <FormControl
            className={clsx({ "input-error": error, input: !error })}
            onChange={onChange}
            onBlur={onBlur}
            error
            focused={false}
          >
            <InputLabel>Password</InputLabel>
            <OutlinedInput value={value} type="password" label="Password" />
          </FormControl>
        )}
        {message && (
          <div className={classes["helper-text"]}>
            <div />
            <div>
              <p>{message}</p>
            </div>
            <div />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTextField;
