import React from "react";
import classes from "./CategoriesMain.module.scss";

import CategoryMain from "./category-main/CategoryMain";
import { TColors } from "../../../consts/colors";
import { useHorizontalScroll } from "src/hooks";
type TCategory = {
  id: string;
  tasks: number;
  completedTasks: number;
  color: TColors;
  name: string;
};
const categories: TCategory[] = [
  { id: "1", tasks: 40, completedTasks: 20, color: "blue", name: "business" },
  { id: "2", tasks: 30, completedTasks: 10, color: "violet", name: "personal" },
  { id: "3", tasks: 3, completedTasks: 1, color: "blue", name: "learning" },
  { id: "4", tasks: 40, completedTasks: 20, color: "violet", name: "personal" },
  { id: "5", tasks: 40, completedTasks: 20, color: "blue", name: "business" },
];

const CategoriesMain = () => {
  const scrollArea = useHorizontalScroll();
  return (
    <>
      <div className="container">
        <div className="chapter">What’s up, Joy?</div>
        <div className="title">CATEGORIES</div>
      </div>
      <div className={classes.gradient}>
        <div className={classes.categories} ref={scrollArea}>
          {categories.map((category) => (
            <CategoryMain
              key={category.id}
              maximum={category.tasks}
              value={category.completedTasks}
              color={category.color}
              name={category.name}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default CategoriesMain;
