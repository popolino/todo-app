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
import React, { useEffect, useState } from "react";
import classes from "./Settings.module.scss";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import clsx from "clsx";
import { useBoundActions } from "../../app/store";
import { useSnackbar } from "notistack";
import { useAppSelector } from "../../app/hooks";
import {} from "../friends/Friends.slice";
import { settingsActions } from "./Settings.slice";
import { TUser } from "../friends/Friends.types";
const allActions = {
  ...settingsActions,
};
const Settings = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const boundActions = useBoundActions(allActions);
  const { enqueueSnackbar } = useSnackbar();

  const status = useAppSelector((state) => state.friendsReducer.status);
  const authUser = useAppSelector(
    (state) => state.authorizationReducer.authUser,
  );
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [picture, setPicture] = useState<string>("");

  useEffect(() => {
    console.log(authUser);
    if (authUser) {
      setName(authUser.name);
      setSurname(authUser.surname);
      authUser.picture && setPicture(authUser.picture);
    }
  }, [authUser]);
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(picture);
    };
  }, [picture]);
  useEffect(() => {
    console.log(picture);
  }, [picture]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPicture(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className="chapter">Settings</div>
        <div className="title">ACCOUNT</div>
        <div className={classes["account-form"]}>
          <div className={classes.circle}>
            {picture ? (
              <img src={picture} alt="Avatar" />
            ) : (
              <SvgSelector id="photo" className={classes.photo} />
            )}

            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className={classes.forms}>
            <div className={clsx(classes.form, "input")}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={clsx(classes.form, "input")}>
              <TextField
                label="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div className={clsx(classes.form, "input")}>
              <FormControl>
                <InputLabel>Password</InputLabel>
                <OutlinedInput type="password" label="Password" />
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
                <InputLabel>Language</InputLabel>
                <Select value={age} label="Language" onChange={handleChange}>
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
