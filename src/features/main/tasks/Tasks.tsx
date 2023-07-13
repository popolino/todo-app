import React, { useEffect, useState } from "react";
import classes from "./Tasks.module.scss";
import Task from "./task/Task";
import clsx from "clsx";
import SvgSelector from "src/components/svgSelector/SvgSelector";
import CircleButton from "src/components/circleButton/CircleButton";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Menu,
  MenuItem,
} from "@mui/material";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CustomModal from "src/components/custom-modal/CustomModal";
import { useAppSelector } from "src/app/hooks";
import {
  addTaskAsync,
  deleteTaskAsync,
  editTaskAsync,
  fetchTasks,
  tasksActions,
} from "./Tasks.slice";
import { TTask } from "./Tasks.types";
import { useBoundActions } from "../../../app/store";
import { useSnackbar } from "notistack";

const allActions = {
  addTaskAsync,
  deleteTaskAsync,
  editTaskAsync,
  fetchTasks,
  ...tasksActions,
};

export type TCoordinates = {
  mouseX: number;
  mouseY: number;
} | null;
type TTasksProps = {};
const Tasks: React.FC<TTasksProps> = () => {
  //actions bound with dispatch
  const boundActions = useBoundActions(allActions);
  const { enqueueSnackbar } = useSnackbar();

  // state
  const editModalOpen = useAppSelector(
    (state) => state.tasksReducer.editModalOpen
  );
  const creationModalOpen = useAppSelector(
    (state) => state.tasksReducer.creationModalOpen
  );
  const input = useAppSelector((state) => state.tasksReducer.input);
  const tasks = useAppSelector((state) => state.tasksReducer.tasks);
  const creating = useAppSelector((state) => state.tasksReducer.meta.creating);
  const updating = useAppSelector((state) => state.tasksReducer.meta.updating);
  const message = useAppSelector((state) => state.tasksReducer.message);
  const status = useAppSelector((state) => state.tasksReducer.status);
  const color = useAppSelector((state) => state.categoriesReducer.color);
  const authUser = useAppSelector(
    (state) => state.authorizationReducer.authUser
  );

  // local state
  const [contextMenu, setContextMenu] = useState<TCoordinates>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [currentActive, setCurrentActive] = useState<TTask | undefined>();
  const [taskDeletionOpen, setTaskDeletionOpen] = useState(false);

  // handlers
  const handleChangeInput = (input: string) => boundActions.setInput(input);
  const handleOpenCreationModal = () => boundActions.openCreationModal();
  const handleCloseCreationModal = () => boundActions.closeCreationModal();
  const handleCloseEditModal = () => boundActions.closeEditModal();
  const handleOpenEditModal = () =>
    currentActive && boundActions.openEditModal(currentActive?.text);
  const handleCreateTask = () => boundActions.addTaskAsync();
  const handleDelete = () =>
    currentActive && boundActions.deleteTaskAsync(currentActive.id);
  const handleSelect = (currentId: string | undefined) => {
    if (!currentId) return;
    if (selected.includes(currentId))
      setSelected(selected.filter((taskId) => taskId !== currentId));
    else setSelected([...selected, currentId]);
  };
  const handleContextClose = () => setContextMenu(null);
  const handleCompleted = (task: TTask) =>
    boundActions.editTaskAsync({ ...task, isCompleted: !task?.isCompleted });
  const handleEditTask = () =>
    currentActive &&
    boundActions.editTaskAsync({ ...currentActive, text: input });
  const handleContextMenu = (event: React.MouseEvent, task: TTask) => {
    event.preventDefault();
    if (selected.length > 0) return;
    setContextMenu({ mouseX: event.clientX, mouseY: event.clientY });
    setCurrentActive(task);
  };
  const handleDeleteAll = () => {
    setSelected([]);
    // setTasks([...tasks.filter((task) => !selected.includes(task.id))]);
  };
  useEffect(() => {
    boundActions.fetchTasks("3922308c-003c-420b-91f6-5d756b647283");
  }, []);
  useEffect(() => {
    message &&
      enqueueSnackbar(message, {
        variant: status !== "failed" ? "info" : "error",
      });
  }, [message]);
  console.log(color);
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
        open={editModalOpen}
        disabled={!input}
        loading={updating}
        onClose={handleCloseEditModal}
        onConfirm={handleEditTask}
      >
        <input
          type="text"
          placeholder="Edit this task"
          value={input}
          onChange={(event) => handleChangeInput(event.target.value)}
        />
      </CustomModal>
      <CustomModal
        open={creationModalOpen}
        disabled={!input}
        loading={creating}
        onClose={handleCloseCreationModal}
        onConfirm={handleCreateTask}
      >
        <input
          type="text"
          placeholder="Enter new task..."
          value={input}
          onChange={(event) => handleChangeInput(event.target.value)}
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
            handleSelect(currentActive?.id);
            handleContextClose();
          }}
        >
          <SvgSelector id="select" />
          Select
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenEditModal();
            handleContextClose();
          }}
        >
          <SvgSelector id="edit" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete();
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
                    color={color}
                    select={selected.includes(task.id)}
                    isCompleted={task.isCompleted}
                    onChange={() => handleCompleted(task)}
                    onSelect={() =>
                      selected.length > 0 && handleSelect(task.id)
                    }
                    onContextMenu={(event) => handleContextMenu(event, task)}
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
              onClick={handleOpenCreationModal}
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
                creating ? (
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
