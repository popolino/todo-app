import React from "react";
import classes from "./Task.module.scss";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";
import { TColors } from "../../../../consts/colors";

interface TTask {
  color: TColors;
  text: string;
  onContextMenu: (event: React.MouseEvent) => void;
}

const Task: React.FC<TTask> = ({ color, text, onContextMenu }) => (
  <>
    <div className="module" onContextMenu={onContextMenu}>
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
      <div className="text-module">{text}</div>
    </div>
  </>
);
export default Task;
