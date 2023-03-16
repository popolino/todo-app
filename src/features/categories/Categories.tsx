import React, { useState } from "react";
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
import { getColor } from "src/utils/Index";
import { v4 as uuid } from "uuid";
import { TransitionGroup } from "react-transition-group";
import { CategoriesMock } from "./Categories.mock";
import { friends } from "../friends/Friends.mock";
import { TCategory } from "./Categories.types";

const userId = "1";
const initialColor = colors[0].name;

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

const Categories = () => {
  const [currentActive, setCurrentActive] = useState<TCategory | undefined>();
  const [members, setMembers] = useState<string[]>([]);
  const [color, setColor] = useState<TColors>(initialColor);
  const [categories, setCategories] = useState(CategoriesMock);
  const [categoriesCreationOpen, setCategoriesCreationOpen] = useState(false);
  const [categoriesEditOpen, setCategoriesEditOpen] = useState(false);
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChangeMembers = (event: SelectChangeEvent<typeof members>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setMembers(typeof value === "string" ? value.split(",") : value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as TColors);
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
    setCategories([
      ...categories.filter((category) => category.id !== currentActive.id),
    ]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCreateCategory = () => {
    setCategories([
      ...categories,
      {
        id: uuid(),
        creatorId: userId,
        name: input,
        color: color,
        members:
          members.map((memberId) => findUser(memberId) || friends[0]) || null,
      },
    ]);

    setCategoriesCreationOpen(false);
  };
  const handleEditModalOpen = () => {
    if (!currentActive) return;
    setCategoriesEditOpen(true);
    setInput(currentActive.name);
    setColor(currentActive.color);
    const memberIds: string[] = currentActive.members
      ? currentActive.members?.map((member) => member.id)
      : [];
    setMembers(memberIds);
  };
  const handleCreationModalOpen = () => {
    setCategoriesCreationOpen(true);
    setInput("");
    setColor(initialColor);
    setMembers([]);
  };
  const handleEditCategory = () => {
    if (!currentActive) return;
    setCategories([
      ...categories.map((category) =>
        category.id === currentActive.id
          ? {
              ...category,
              name: input,
              members:
                members.map((memberId) => findUser(memberId) || friends[0]) ||
                null,
              color: color,
            }
          : category
      ),
    ]);
    setCategoriesEditOpen(false);
  };
  const findUser = (id: string) => friends.find((friend) => friend.id === id);
  const renderMembers = (selected: string[]) => {
    console.log("members", members);
    return selected
      .map((userId) => `${findUser(userId)?.name} ${findUser(userId)?.surname}`)
      .join(", ");
  };

  const getCategories = ({ own }: { own: boolean }) =>
    categories.filter((category) =>
      own ? category.creatorId === userId : category.creatorId !== userId
    );
  return (
    <>
      <CustomModal
        open={categoriesCreationOpen}
        onClose={() => setCategoriesCreationOpen(false)}
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
                onChange={handleChange}
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
              onChange={(event) => setInput(event.target.value)}
            />
          </div>
          <div className="input checkmarks">
            <FormControl>
              <InputLabel id="demo-multiple-checkbox-label">Members</InputLabel>
              <Select
                multiple
                value={members}
                onChange={handleChangeMembers}
                input={<OutlinedInput label="Tag" />}
                renderValue={renderMembers}
                MenuProps={MenuProps}
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
        open={categoriesEditOpen}
        onClose={() => setCategoriesEditOpen(false)}
        disabled={!input}
        onConfirm={handleEditCategory}
      >
        <div className={classes["modal-container"]}>
          <h1>Edit category</h1>
          <div className="input color">
            <FormControl fullWidth required={true}>
              <InputLabel>Color</InputLabel>
              <Select
                value={color}
                label="Color"
                onChange={handleChange}
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
              onChange={(event) => setInput(event.target.value)}
            />
          </div>
          <div className="input checkmarks">
            <FormControl>
              <InputLabel id="demo-multiple-checkbox-label">Members</InputLabel>
              <Select
                multiple
                value={members}
                onChange={handleChangeMembers}
                input={<OutlinedInput label="Tag" />}
                renderValue={renderMembers}
                MenuProps={MenuProps}
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
        <MenuItem onClick={handleClose}>
          <SvgSelector id="view" /> View
        </MenuItem>
        {currentActive?.creatorId === userId && (
          <MenuItem
            onClick={() => {
              handleEditModalOpen();
              handleClose();
            }}
          >
            {" "}
            <SvgSelector id="edit" />
            Edit
          </MenuItem>
        )}
        {currentActive?.creatorId === userId ? (
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
                    .filter((category) => category.creatorId !== userId)
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
              onClick={handleCreationModalOpen}
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
