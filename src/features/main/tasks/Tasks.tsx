import React from "react";
import classes from "./Tasks.module.scss";
import Task from "./task/Task";
import clsx from "clsx";
import { TColors } from "../../../consts/colors";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import CircleButton from "../../../components/circleButton/CircleButton";

type TTask = {
  id: string;
  color: TColors;
  text: string;
};

const tasks: TTask[] = [
  { id: "1", text: "daily meeting with team", color: "blue" },
  { id: "2", text: "meditation", color: "blue" },
  { id: "3", text: "daily meeting with team", color: "blue" },
  { id: "4", text: "daily meeting with team", color: "blue" },
  { id: "5", text: "daily meeting with team", color: "blue" },
  { id: "6", text: "daily meeting with team", color: "blue" },
  { id: "7", text: "daily meeting with team", color: "blue" },
];

const Tasks = () => {
  return (
    <div className={clsx("container", classes.tasks)}>
      <div className={clsx(classes.avatar, "title")}>PERSONAL</div>
      <div className={classes.list}>
        {tasks.map((task) => (
          <Task key={task.id} text={task.text} color={task.color} />
        ))}
      </div>
      <div className="container circle-container">
        <CircleButton
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
  );
};
export default Tasks;
