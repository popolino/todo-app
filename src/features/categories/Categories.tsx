import React, { useEffect, useState } from "react";
import classes from "./Categories.module.scss";
import Category from "./category/Category";
import CircleButton from "../../components/circleButton/CircleButton";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import {
  Collapse,
  FormControl,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import CustomModal from "src/components/custom-modal/CustomModal";
import clsx from "clsx";
import Avatar from "src/components/avatar/Avatar";
import { colors, TColors } from "src/consts/colors";
import { getColor } from "src/utils";
import { TransitionGroup } from "react-transition-group";
import {
  ICreateCategoryRequest,
  TCategory,
  TEditCategoryRequest,
} from "./Categories.types";
import { useAppSelector } from "../../app/hooks";
import {
  addCategoryAsync,
  categoriesActions,
  deleteCategoryAsync,
  editCategoryAsync,
  fetchCategories,
} from "./Categories.slice";
import { fetchFriends } from "../friends/Friends.slice";
import { findUser } from "./categories.utils";
import { useBoundActions } from "../../app/store";
import { useSnackbar } from "notistack";
import { getUsers } from "../friends/friends.utils";
import { TUser } from "../friends/Friends.types";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const allActions = {
  fetchFriends,
  addCategoryAsync,
  deleteCategoryAsync,
  editCategoryAsync,
  fetchCategories,

  ...categoriesActions,
};

const Categories = () => {
  const boundActions = useBoundActions(allActions);
  const { enqueueSnackbar } = useSnackbar();

  const input = useAppSelector((state) => state.categoriesReducer.input);
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );
  const members = useAppSelector((state) => state.categoriesReducer.members);
  const creationModalOpen = useAppSelector(
    (state) => state.categoriesReducer.creationModalOpen
  );
  const editModalOpen = useAppSelector(
    (state) => state.categoriesReducer.editModalOpen
  );
  const message = useAppSelector((state) => state.categoriesReducer.message);
  const status = useAppSelector((state) => state.categoriesReducer.status);
  const color = useAppSelector((state) => state.categoriesReducer.color);
  const users = useAppSelector((state) => state.friendsReducer.users);
  const authUser = useAppSelector(
    (state) => state.authorizationReducer.authUser
  );

  const [currentActive, setCurrentActive] = useState<TCategory | undefined>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const friends = getUsers(users, "friends");
  const navigate = useNavigate();

  const handleChangeMembers = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    boundActions.changeMembers(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeColor = (event: SelectChangeEvent) => {
    boundActions.changeColor(event.target.value as TColors);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: TCategory
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentActive(category);
  };
  const handleDelete = () => {
    if (!currentActive) return;
    boundActions.deleteCategoryAsync(currentActive.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    boundActions.setInput(event.target.value);
  };
  const handleCreateCategory = () => boundActions.addCategoryAsync();
  const handleOpenEditModal = () =>
    currentActive && boundActions.openEditModal(currentActive);
  const handleCloseEditModal = () => boundActions.closeEditModal();
  const handleOpenCreationModal = () => {
    boundActions.openCreationModal();
  };
  const handleCloseCreationModal = () => {
    boundActions.closeCreationModal();
  };
  const handleEditCategory = (currentCategory: TEditCategoryRequest) => {
    boundActions.editCategoryAsync(currentCategory);

    handleCloseEditModal();
  };

  const renderMembers = (selected: string[]) => {
    return selected
      .map((userId) =>
        friends.length && !currentActive?.members.length
          ? `${findUser(friends, userId)?.name} ${
              findUser(friends, userId)?.surname
            }`
          : `${findUser(currentActive?.members as TUser[], userId)?.name} ${
              findUser(currentActive?.members as TUser[], userId)?.surname
            }`
      )
      .join(", ");
  };

  const getCategories = ({ own }: { own: boolean }) =>
    categories.filter((category) =>
      own
        ? category.creatorId === authUser?.id
        : category.creatorId !== authUser?.id
    );
  useEffect(() => {
    boundActions.fetchCategories();
  }, []);
  useEffect(() => {
    message &&
      enqueueSnackbar(message, {
        variant: status !== "failed" ? "info" : "error",
      });
  }, [message]);

  return (
    <>
      <CustomModal
        open={creationModalOpen}
        onClose={handleCloseCreationModal}
        disabled={!input}
        onConfirm={handleCreateCategory}
      >
        <div className={classes["modal-container"]}>
          <h1>Enter new category</h1>
          <div className="input color">
            <FormControl fullWidth required={true}>
              <InputLabel>Color</InputLabel>
              <Select
                value={color}
                label="Color"
                onChange={handleChangeColor}
                renderValue={() => (
                  <div
                    color={getColor(color || "red")}
                    style={{ background: getColor(color || "red") }}
                    className={clsx("colors", classes.selected)}
                  />
                )}
              >
                {colors.map((color) => (
                  <MenuItem key={color.name} value={color.name}>
                    <div
                      style={{ background: getColor(color.name) }}
                      className={clsx("colors")}
                    />
                    {color.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={clsx(classes.input, "input")}>
            <TextField
              required={true}
              autoComplete="off"
              id="outlined-textarea"
              label="Name"
              value={input}
              onChange={handleChangeInput}
            />
          </div>
          <div className="input checkmarks">
            <FormControl>
              <InputLabel id="demo-multiple-checkbox-label">Members</InputLabel>
              <Select
                multiple
                value={members}
                renderValue={renderMembers}
                input={<OutlinedInput label="Tag" />}
                MenuProps={MenuProps}
                onOpen={boundActions.fetchFriends}
                onChange={handleChangeMembers}
              >
                {friends.map((friend) => (
                  <MenuItem key={friend.id} value={friend.id}>
                    <Avatar picture={friend.picture} name={friend.name} />
                    <ListItemText
                      primary={`${friend.name} ${friend.surname}`}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </CustomModal>
      <CustomModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        disabled={!input}
        onConfirm={() =>
          currentActive &&
          handleEditCategory({
            id: currentActive.id,
            name: input,
            color: color,
            memberIds: [],
          })
        }
      >
        <div className={classes["modal-container"]}>
          <h1>Edit category</h1>
          <div className="input color">
            <FormControl fullWidth required={true}>
              <InputLabel>Color</InputLabel>
              <Select
                value={color}
                label="Color"
                onChange={handleChangeColor}
                renderValue={() => (
                  <div
                    color={getColor(color || "red")}
                    style={{ background: getColor(color || "red") }}
                    className={clsx("colors", classes.selected)}
                  />
                )}
              >
                {colors.map((color) => (
                  <MenuItem key={color.name} value={color.name}>
                    <div
                      style={{ background: getColor(color.name) }}
                      className={clsx("colors")}
                    />
                    {color.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={clsx(classes.input, "input")}>
            <TextField
              required={true}
              autoComplete="off"
              id="outlined-textarea"
              label="Name"
              value={input}
              onChange={handleChangeInput}
            />
          </div>
          <div className="input checkmarks">
            <FormControl>
              <InputLabel id="demo-multiple-checkbox-label">Members</InputLabel>
              <Select
                multiple
                value={members}
                input={<OutlinedInput label="Tag" />}
                renderValue={renderMembers}
                MenuProps={MenuProps}
                onChange={handleChangeMembers}
                onOpen={boundActions.fetchFriends}
              >
                {friends.map((friend) => (
                  <MenuItem key={friend.id} value={friend.id}>
                    <Avatar picture={friend.picture} name={friend.name} />
                    <ListItemText
                      primary={`${friend.name} ${friend.surname}`}
                    />
                  </MenuItem>
                ))}
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
        <MenuItem
          onClick={() => {
            // currentActive && console.log(currentActive.id);
            navigate("/tasks");
          }}
        >
          <SvgSelector id="view" /> View
        </MenuItem>
        {currentActive?.creatorId === authUser?.id && (
          <MenuItem
            onClick={() => {
              handleOpenEditModal();
              handleClose();
            }}
          >
            <SvgSelector id="edit" />
            Edit
          </MenuItem>
        )}
        {currentActive?.creatorId === authUser?.id ? (
          <MenuItem
            onClick={() => {
              handleClose();
              handleDelete();
            }}
          >
            <SvgSelector id="delete" />
            Delete
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleClose();
              handleDelete();
            }}
          >
            <SvgSelector id="logout" />
            Leave
          </MenuItem>
        )}
      </Menu>
      <div className="main-container">
        <div className="container">
          <div className="chapter">Categories</div>
          <div className="title">OWN</div>
          <div className={classes.categories}>
            <TransitionGroup component={"ul"}>
              {getCategories({ own: true }).length > 0 ? (
                getCategories({ own: true }).map((category) => (
                  <Collapse key={category.id}>
                    <Category
                      name={category.name}
                      color={category.color}
                      onClick={(event) => handleClick(event, category)}
                    />
                  </Collapse>
                ))
              ) : (
                <Collapse>
                  <li className="empty-message">There is no categories yet</li>
                </Collapse>
              )}
            </TransitionGroup>
          </div>
          {getCategories({ own: false }).length > 0 && (
            <>
              <div className="title">PARTICIPATION</div>
              <div className={classes.categories}>
                <TransitionGroup>
                  {categories
                    .filter((category) => category.creatorId !== authUser?.id)
                    .map((category) => (
                      <Collapse key={category.id}>
                        <Category
                          name={category.name}
                          color={category.color}
                          onClick={(event) => handleClick(event, category)}
                        />
                      </Collapse>
                    ))}
                </TransitionGroup>
              </div>
            </>
          )}
          <div className="container circle-container">
            <CircleButton
              onClick={handleOpenCreationModal}
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
