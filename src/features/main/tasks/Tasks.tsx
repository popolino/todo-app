import React, { useState } from "react";
import classes from "./Tasks.module.scss";
import Task from "./task/Task";
import clsx from "clsx";
import { TColors } from "../../../consts/colors";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import CircleButton from "../../../components/circleButton/CircleButton";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Menu,
  MenuItem,
} from "@mui/material";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { v4 as uuid } from "uuid";

export type TTask = {
  id: string;
  color: TColors;
  text: string;
  isCompleted: boolean;
};

const initialTasks: TTask[] = [
  {
    id: "1",
    text: "Daily meeting with team",
    color: "blue",
    isCompleted: true,
  },
  { id: "2", text: "Meditation", color: "blue", isCompleted: false },
  {
    id: "3",
    text: "Pay for rent",
    color: "blue",
    isCompleted: false,
  },
  {
    id: "4",
    text: "Check emails",
    color: "blue",
    isCompleted: false,
  },
  {
    id: "5",
    text: "Lunch with Daniel",
    color: "blue",
    isCompleted: false,
  },
  {
    id: "6",
    text: "Family dinner",
    color: "blue",
    isCompleted: false,
  },
  {
    id: "7",
    text: "Daily meeting with team",
    color: "blue",
    isCompleted: false,
  },
];
export type TCoordinates = {
  mouseX: number;
  mouseY: number;
} | null;
type TTasksProps = {};
const Tasks: React.FC<TTasksProps> = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [contextMenu, setContextMenu] = useState<TCoordinates>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [currentActive, setCurrentActive] = useState<string | undefined>();
  const [taskCreationOpen, setTaskCreationOpen] = useState(false);
  const [taskDeletionOpen, setTaskDeletionOpen] = useState(false);
  const [taskEditOpen, setTaskEditOpen] = useState(false);
  const [input, setInput] = useState("");

  const fetching = false;

  const handleSelect = (currentId: string | undefined) => {
    if (!currentId) return;
    if (selected.includes(currentId))
      setSelected(selected.filter((taskId) => taskId !== currentId));
    else setSelected([...selected, currentId]);
  };
  const handleContextMenu = (event: React.MouseEvent, taskId: string) => {
    event.preventDefault();
    if (selected.length > 0) return;
    setContextMenu({ mouseX: event.clientX, mouseY: event.clientY });
    setCurrentActive(taskId);
  };
  const handleDelete = (currentId: string | undefined) => {
    setTasks([...tasks.filter((task) => task.id !== currentId)]);
  };
  const handleDeleteAll = () => {
    setSelected([]);
    setTasks([...tasks.filter((task) => !selected.includes(task.id))]);
  };
  const handleContextClose = () => {
    setContextMenu(null);
  };
  const handleCompleted = (task: TTask) =>
    setTasks([
      ...tasks.map((currentTask) =>
        currentTask.id === task.id
          ? {
              ...currentTask,
              isCompleted: !currentTask.isCompleted,
            }
          : currentTask
      ),
    ]);
  const handleCreateTask = () => {
    setTasks([
      ...tasks,
      {
        id: uuid(),
        text: input,
        color: "blue",
        isCompleted: false,
      },
    ]);
    setInput("");
    setTaskCreationOpen(false);
  };
  const handleEditTask = () => {
    if (!currentActive) return;
    setTasks([
      ...tasks.map((currentTask) =>
        currentTask.id === currentActive
          ? { ...currentTask, text: input }
          : currentTask
      ),
    ]);
    setInput("");
    setTaskEditOpen(false);
  };
  return (
    <>
      <CustomModal
        open={taskDeletionOpen}
        onClose={() => setTaskDeletionOpen(false)}
        onConfirm={() => {
          handleDeleteAll();
          setTaskDeletionOpen(false);
        }}
      >
        <>
          <p>Are you sure you want to delete selected tasks?</p>
          <div className={clsx("checkbox-small", classes.checkbox)}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Don’t show this message again"
              />
            </FormGroup>
          </div>
        </>
      </CustomModal>
      <CustomModal
        open={taskEditOpen}
        disabled={!input}
        onClose={() => {
          setTaskEditOpen(false);
          setInput("");
        }}
        onConfirm={handleEditTask}
      >
        <input
          type="text"
          placeholder="Edit this task"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </CustomModal>
      <CustomModal
        open={taskCreationOpen}
        disabled={!input}
        onClose={() => {
          setTaskCreationOpen(false);
          setInput("");
        }}
        onConfirm={handleCreateTask}
      >
        <input
          type="text"
          placeholder="Enter new task..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </CustomModal>
      <Menu
        className="menu"
        open={contextMenu !== null}
        onClose={handleContextClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { left: contextMenu.mouseX, top: contextMenu.mouseY }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            handleSelect(currentActive);
            handleContextClose();
          }}
        >
          <SvgSelector id="select" />
          Select
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTaskEditOpen(true);

            const task = tasks.find((task) => task.id === currentActive);
            if (!task) return;
            setInput(task.text);
            handleContextClose();
          }}
        >
          <SvgSelector id="edit" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(currentActive);
            handleContextClose();
          }}
        >
          <SvgSelector id="delete" />
          Delete
        </MenuItem>
      </Menu>
      <div className={clsx("container", classes.tasks)}>
        <div className={clsx(classes.avatar, "title")}>
          {selected.length === 0
            ? "PERSONAL"
            : "SELECTED - " + `${selected.length}`}
        </div>
        <div className={classes.list}>
          <TransitionGroup component={"ul"}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Collapse key={task.id}>
                  <Task
                    text={task.text}
                    color={task.color}
                    select={selected.includes(task.id)}
                    isCompleted={task.isCompleted}
                    onChange={() => handleCompleted(task)}
                    onSelect={() =>
                      selected.length > 0 && handleSelect(task.id)
                    }
                    onContextMenu={(event) => handleContextMenu(event, task.id)}
                  />
                </Collapse>
              ))
            ) : (
              <Collapse>
                <li className="empty-message">There is no tasks yet</li>
              </Collapse>
            )}
          </TransitionGroup>
        </div>
        <div className="container circle-container">
          {selected.length === 0 ? (
            <CircleButton
              onClick={() => setTaskCreationOpen(true)}
              className="circle-button"
              icon={
                <>
                  <div className="vertical" />
                  <div className="horizontal" />
                </>
              }
            />
          ) : (
            <CircleButton
              color="red"
              onClick={() => setTaskDeletionOpen(true)}
              className="circle-button"
              icon={
                fetching ? (
                  <SvgSelector id="preloader" className="preloader" />
                ) : (
                  <SvgSelector id="delete" className="delete-icon" />
                )
              }
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Tasks;
