import React from "react";
import classes from "./CategoriesMain.module.scss";

import CategoryMain from "./category-main/CategoryMain";
import { useHorizontalScroll } from "src/hooks";
import { TCategory } from "../../categories/Categories.types";

type TCategoriesMainProps = {
  categories: TCategory[];
};

const CategoriesMain: React.FC<TCategoriesMainProps> = ({ categories }) => {
  const scrollArea = useHorizontalScroll();
  console.log(categories);
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
              maximum={category.totalTasks}
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
