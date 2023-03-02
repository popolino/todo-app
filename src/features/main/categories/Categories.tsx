import React, { useRef } from "react";
import classes from "./Categories.module.scss";

import Category from "./category/Category";
import { TColors } from "../../../consts/colors";
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

const Categories = () => {
  const scrollArea = useRef<HTMLDivElement>(null);
  //
  // useEffect(() => {
  //   console.log(scrollArea);
  //   document.addEventListener("wheel", (event) => {
  //     console.log(event);
  //     const current = scrollArea.current;
  //     if (current) {
  //       current.scrollLeft = current.scrollLeft + event.deltaY / 2;
  //     }
  //   });
  // }, [scrollArea.current]);

  return (
    <>
      <div className="container">
        <div className="chapter">What’s up, Joy?</div>
        <div className="title">CATEGORIES</div>
      </div>
      <div className={classes.gradient}>
        <div className={classes.categories} ref={scrollArea}>
          {categories.map((category) => (
            <Category
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
export default Categories;
