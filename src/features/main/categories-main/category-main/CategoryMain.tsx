import classes from "./CategoryMain.module.scss";
import Progress, {
  TProgressProps,
} from "../../../../components/progress/Progress";
import React, { useEffect, useState } from "react";
import Task from "../../tasks/task/Task";
import { TCategory } from "../../../categories/Categories.types";
// import { fetchFriends } from "../../../friends/Friends.slice";
// import {
//   addCategoryAsync,
//   categoriesActions,
//   deleteCategoryAsync,
//   editCategoryAsync,
//   fetchCategories,
// } from "../../../categories/Categories.slice";
// import { fetchTasks, tasksActions } from "../../tasks/Tasks.slice";
// import { useBoundActions } from "../../../../app/store";
import { TColors } from "../../../../consts/colors";
import { set } from "react-hook-form";
import { TUser } from "../../../friends/Friends.types";

type ICategoryProps = {
  categories: TCategory[];
  getTasks: (id: string) => void;
  setCategory: (category: TCategory) => void;
  setColor: (color: TColors) => void;
  category: TCategory;
  authUser: TUser | null;
};

const CategoryMain: React.FC<ICategoryProps> = ({
  categories,
  getTasks,
  setCategory,
  category,
  setColor,
  authUser,
}) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleClick = () => {
    setCategory(category);
    getTasks(category.id);

    setTimeout(() => {
      setColor(category.color);
    }, 100);
  };

  useEffect(() => {
    if (isInitialLoad && categories.length > 0) {
      const sortedCategories = [...categories].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setCategory(sortedCategories[0]);
      setIsInitialLoad(false);
    }
  }, [categories, isInitialLoad, authUser]);

  return (
    <div className={classes.category} onClick={handleClick}>
      <div className={classes.tasks}>{category.taskCount} tasks</div>
      <div className={classes.name}>{category.name}</div>
      <Progress
        maximum={category.taskCount}
        value={category.completedTaskCount}
        color={category.color}
      />
    </div>
  );
};

export default CategoryMain;
