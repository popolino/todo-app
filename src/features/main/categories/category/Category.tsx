import classes from "./Category.module.scss";
import Progress, {
  TProgressProps,
} from "../../../../components/progress/Progress";
import React from "react";

interface ICategoryProps extends TProgressProps {
  name: string;
}

const Category: React.FC<ICategoryProps> = ({
  maximum,
  value,
  color,
  name,
}) => (
  <div className={classes.category}>
    <div className={classes.tasks}>{maximum} tasks</div>
    <div className={classes.name}>{name}</div>
    <Progress maximum={maximum} value={value} color={color} />
  </div>
);

export default Category;
