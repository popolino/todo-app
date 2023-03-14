import React, { useEffect, useState } from "react";
import classes from "./Reveal.module.scss";
import clsx from "clsx";

const Reveal: React.FC = () => {
  const [isPlaying, setPlaying] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => setPlaying(false), 4750);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <>
      {isPlaying && (
        <>
          <div className={clsx(classes.circle, classes.background)} />
          <div className={clsx(classes.circle, classes.first)} />
          <div className={clsx(classes.circle, classes.second)} />
          <div className={clsx(classes.circle, classes.third)} />
          <div className={clsx(classes.title)}>Welcome!</div>
        </>
      )}
    </>
  );
};

export default Reveal;
