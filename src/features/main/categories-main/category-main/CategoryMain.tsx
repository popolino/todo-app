import classes from "./CategoryMain.module.scss";
import Progress, {
  TProgressProps,
} from "../../../../components/progress/Progress";
import React, { useEffect } from "react";
import Task from "../../tasks/task/Task";
import { TCategory } from "../../../categories/Categories.types";
import { fetchFriends } from "../../../friends/Friends.slice";
import {
  addCategoryAsync,
  categoriesActions,
  deleteCategoryAsync,
  editCategoryAsync,
  fetchCategories,
} from "../../../categories/Categories.slice";
import { fetchTasks, tasksActions } from "../../tasks/Tasks.slice";
import { useBoundActions } from "../../../../app/store";
import { TColors } from "../../../../consts/colors";

interface ICategoryProps extends TProgressProps {
  name: string;
  categories: TCategory[];
  getTasks: (id: string) => void;
  setCategoryId: (id: string) => void;
  setColor: (color: TColors) => void;
  id: string;
}

const CategoryMain: React.FC<ICategoryProps> = ({
  categories,
  getTasks,
  maximum,
  value,
  color,
  name,
  id,
  setCategoryId,
  setColor,
}) => {
  const handleClick = () => {
    setCategoryId(id); // Сначала устанавливаем категорию
    getTasks(id); // Загружаем задачи

    setTimeout(() => {
      setColor(color); // После небольшой задержки устанавливаем цвет
    }, 100); // Задержка в 300 миллисекунд, можно изменить на нужное значение
  };

  useEffect(() => {
    if (categories.length > 0) {
      const sortedCategories = [...categories].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      getTasks(sortedCategories[0].id);
    }
  }, [categories]);
  return (
    <div className={classes.category} onClick={handleClick}>
      <div className={classes.tasks}>{maximum} tasks</div>
      <div className={classes.name}>{name}</div>
      <Progress maximum={maximum} value={value} color={color} />
    </div>
  );
};

export default CategoryMain;
