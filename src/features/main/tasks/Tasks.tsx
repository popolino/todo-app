import React, { useState } from "react";
import classes from "./Tasks.module.scss";
import Task from "./task/Task";
import clsx from "clsx";
import { TColors } from "../../../consts/colors";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import CircleButton from "../../../components/circleButton/CircleButton";
import { Box, IconButton, Menu, MenuItem, Modal } from "@mui/material";

type TTask = {
  id: string;
  color: TColors;
  text: string;
};

const initialTasks: TTask[] = [
  { id: "1", text: "daily meeting with team", color: "blue" },
  { id: "2", text: "meditation", color: "blue" },
  { id: "3", text: "daily meeting with team", color: "blue" },
  { id: "4", text: "daily meeting with team", color: "blue" },
  { id: "5", text: "daily meeting with team", color: "blue" },
  { id: "6", text: "daily meeting with team", color: "blue" },
  { id: "7", text: "daily meeting with team", color: "blue" },
];
type TCoordinates = {
  mouseX: number;
  mouseY: number;
} | null;

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
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
      <Modal
        open={open}
        onClose={handleClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <div className="modal-close">
            <IconButton
              classes={{ sizeLarge: classes["icon-button"] }}
              size="large"
              onClick={handleClosed}
            >
              <SvgSelector id="close" />
            </IconButton>
          </div>
          <input type="text" placeholder="Enter new task..." />
          <div className="modal-buttons">
            <button className="gray-button">Cancel</button>
            <button className="blue-button">Confirm</button>
          </div>
        </Box>
      </Modal>
      <Menu
        className="menu-item"
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { left: contextMenu.mouseX, top: contextMenu.mouseY }
            : undefined
        }
      >
        <MenuItem
          onClick={handleClose}
          classes={{
            root: "menu-item",
            divider: "свой-класс",
          }}
        >
          <SvgSelector id="select" />
          Select
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <SvgSelector id="delete" />
          Delete
        </MenuItem>
      </Menu>
      <div className={clsx("container", classes.tasks)}>
        <div className={clsx(classes.avatar, "title")}>PERSONAL</div>
        <div className={classes.list}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              text={task.text}
              color={task.color}
              onContextMenu={handleContextMenu}
            />
          ))}
        </div>
        <div className="container circle-container">
          <CircleButton
            onChange={handleOpen}
            className="circle-button"
            icon={
              <SvgSelector id="preloader" className="preloader" />
              // <>
              //   <div className="vertical" />
              //   <div className="horizontal" />
              // </>
            }
          />
        </div>
      </div>
    </>
  );
};
export default Tasks;
