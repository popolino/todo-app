import React from "react";
import classes from "./Task.module.scss";
import { Checkbox } from "@mui/material";
import SvgSelector from "src/components/svgSelector/SvgSelector";
import clsx from "clsx";
import { TTask } from "../Tasks.types";
import { useAppSelector } from "../../../../app/hooks";

interface ITaskProps extends Partial<TTask> {
  select: boolean;
  onSelect: () => void;
  onChange: () => void;
  onContextMenu: (event: React.MouseEvent) => void;
}

const Task: React.FC<ITaskProps> = ({
  isCompleted,
  color,
  text,
  select,
  onSelect,
  onChange,
  onContextMenu,
}) => {
  return (
    <>
      <div
        className={clsx(
          "module",
          { [classes.select]: select },
          { [classes.completed]: isCompleted }
        )}
        onClick={onSelect}
        onContextMenu={onContextMenu}
      >
        <div className="checkbox-task">
          <Checkbox
            onChange={onChange}
            checked={isCompleted}
            icon={<SvgSelector id="checkbox" color={color} />}
            checkedIcon={<SvgSelector id="checked" color={color} />}
          />
        </div>
        <div
          className={clsx("text-module", {
            [classes["selected-text"]]: select,
          })}
        >
          {text}
        </div>
      </div>
    </>
  );
};
export default Task;
