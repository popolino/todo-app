import React, { useState } from "react";
import classes from "./Categories.module.scss";
import Category from "./category/Category";
import CircleButton from "../../components/circleButton/CircleButton";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import { Menu, MenuItem } from "@mui/material";

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
type TCoordinates = {
  mouseX: number;
  mouseY: number;
} | null;
const Categories = () => {
  const [contextMenu, setContextMenu] = useState<TCoordinates>(null);
  const handleContextMenu = (event: React.MouseEvent) => {
    setContextMenu({ mouseX: event.clientX, mouseY: event.clientY });
    event.preventDefault();
    console.log(event);
  };
  const handleClose = (event: React.MouseEvent) => {
    setContextMenu(null);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClosed = () => setOpen(false);
  return (
    <>
      <Menu
        className="categories menu"
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { left: contextMenu.mouseX, top: contextMenu.mouseY }
            : undefined
        }
      >
        <MenuItem>
          <SvgSelector id="view" />
          View
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
                onContextMenu={handleContextMenu}
              />
            ))}
          </div>
          <div className="container circle-container">
            <CircleButton
              onClick={handleOpen}
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
