import React, { useState } from "react";
import classes from "./Categories.module.scss";
import Category from "./category/Category";
import CircleButton from "../../components/circleButton/CircleButton";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import CustomModal from "../../components/custom-modal/CustomModal";
import clsx from "clsx";

type TCategoriesProps = {
  id: string;
  name: string;
};
const categories: TCategoriesProps[] = [
  { id: "1", name: "Business" },
  { id: "2", name: "Personal" },
  { id: "3", name: "Groceries" },
  { id: "4", name: "Work" },
  { id: "5", name: "Daily routine" },
  { id: "6", name: "Business" },
  { id: "7", name: "Personal" },
  { id: "8", name: "Groceries" },
  { id: "9", name: "Work" },
  { id: "10", name: "Daily routine" },
];

const Categories = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const [categoriesCreationOpen, setCategoriesCreationOpen] = useState(false);
  const [categoriesDeletionOpen, setCategoriesDeletionOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <CustomModal
        open={true}
        onClose={() => setCategoriesCreationOpen(false)}
        onConfirm={() => false}
      >
        <div className={classes["modal-container"]}>
          <p>Enter new category</p>
          <div className="input color">
            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select value={age} label="Color" onChange={handleChange}>
                <MenuItem value={10}>
                  <div className={clsx("colors", classes.blue)} />
                  Blue
                </MenuItem>
                <MenuItem value={20}>
                  <div className={clsx("colors", classes.violet)} />
                  Violet
                </MenuItem>
                <MenuItem value={30}>
                  {" "}
                  <div className={clsx("colors", classes.red)} />
                  Red
                </MenuItem>
                <MenuItem value={30}>
                  <div className={clsx("colors", classes.orange)} />
                  Orange
                </MenuItem>
                <MenuItem value={30}>
                  <div className={clsx("colors", classes.yellow)} />
                  Yellow
                </MenuItem>
                <MenuItem value={30}>
                  <div className={clsx("colors", classes.green)} />
                  Green
                </MenuItem>
                <MenuItem value={30}>
                  <div className={clsx("colors", classes.aqua)} />
                  Aqua
                </MenuItem>
                <MenuItem value={30}>
                  <div className={clsx("colors", classes.pink)} />
                  Pink
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </CustomModal>
      <Menu
        className="categories menu"
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <SvgSelector id="view" /> View
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <SvgSelector id="edit" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <SvgSelector id="delete" />
          Delete
        </MenuItem>
      </Menu>
      <div className="main-container">
        <div className="container">
          <div className="chapter">Categories</div>
          <div className={classes.categories}>
            {categories.map((category) => (
              <Category
                key={category.id}
                name={category.name}
                onClick={handleClick}
              />
            ))}
          </div>
          <div className="container circle-container">
            <CircleButton
              onClick={() => setCategoriesCreationOpen(true)}
              className="circle-button"
              icon={
                // <SvgSelector id="preloader" className="preloader" />
                // <SvgSelector id="delete" className="delete-icon" />
                <>
                  <div className="vertical" />
                  <div className="horizontal" />
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Categories;
