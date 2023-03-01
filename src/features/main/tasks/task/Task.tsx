import React from "react";
import classes from "./Task.module.scss";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";
import { TColors } from "../../../../consts/colors";
import { TProgressProps } from "../../../../components/progress/Progress";

interface TTask {
  color: TColors;
  text: string;
}

const Task: React.FC<TTask> = ({ color, text }) => (
  <>
    <div className={classes.task}>
      <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                icon={
                  <SvgSelector
                    id="checkbox"
                    className={classes.checkbox}
                    color={color}
                  />
                }
                checkedIcon={<SvgSelector id="checked" color={color} />}
              />
            }
            label=" "
          />
        </FormGroup>
      </div>
      <div className={classes.text}>{text}</div>
    </div>
  </>
);
export default Task;
