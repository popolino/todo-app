import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";
import classes from "./Settings.module.scss";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import clsx from "clsx";

const Settings = () => {
  const currencies = [
    {
      value: "English",
      label: "English",
    },
    {
      value: "Русский",
      label: "Русский",
    },
    {
      value: "Español",
      label: "Español",
    },
    {
      value: "العربية",
      label: "العربية",
    },
  ];
  return (
    <div className="main-container">
      <div className="container">
        <div className="chapter">Settings</div>
        <div className="title">ACCOUNT</div>
        <div className={classes["account-form"]}>
          <div className={classes.circle}>
            <SvgSelector id="photo" className={classes.photo} />
          </div>
          <div className={classes.forms}>
            <div className={clsx(classes.form, "input")}>
              <TextField id="outlined-textarea" label="Name" />
            </div>
            <div className={clsx(classes.form, "input")}>
              <TextField id="outlined-textarea" label="Surname" />
            </div>
            <div className={clsx(classes.form, "input")}>
              <FormControl>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="password"
                  label="Password"
                />
              </FormControl>
            </div>
          </div>
          <div className={classes.button}>
            <button className="blue-button">Save</button>
          </div>
        </div>
        <div className="title">ADDITIONAL</div>
        <div className={classes["additional-form"]}>
          <div className={classes.forms}>
            <div className={clsx(classes.form, "input")}>
              <TextField
                id="outlined-select-currency"
                select
                label="Language"
                defaultValue="English"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={classes.form}>
              <div className="checkbox">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Show confirm messages"
                  />
                </FormGroup>
              </div>
            </div>
          </div>
          <div className={classes.button}>
            <button className="blue-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
