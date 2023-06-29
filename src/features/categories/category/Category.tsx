import React from "react";
import classes from "./Category.module.scss";
import clsx from "clsx";
import { IconButton } from "@mui/material";
import { getColor } from "src/utils";
import { TColors } from "../../../consts/colors";
import { TCategory } from "../Categories.types";

interface TCategories extends Partial<TCategory> {
  color: TColors;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Category: React.FC<TCategories> = ({ name, color, onClick }) => {
  return (
    <div className={clsx("module", classes.module)}>
      <div className="module-part">
        <div style={{ background: getColor(color) }} className="colors" />
        <p className="text-module">{name}</p>
      </div>
      <IconButton
        classes={{ sizeLarge: classes["icon-button"] }}
        size="large"
        onClick={onClick}
      >
        <div className={classes.options}>
          <div />
          <div />
          <div />
        </div>
      </IconButton>
    </div>
  );
};
export default Category;
