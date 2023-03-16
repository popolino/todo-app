import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import classes from "./Settings.module.scss";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import clsx from "clsx";

const Settings = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Language"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>English</MenuItem>
                  <MenuItem value={20}>Русский</MenuItem>
                  <MenuItem value={30}>Español</MenuItem>
                  <MenuItem value={40}>العربية</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.form}>
              <div className="checkbox">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
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
