import React  from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Modal,
} from "@mui/material";
import classes from "./Tasks.module.scss";
import SvgSelector from "src/components/svgSelector/SvgSelector";
import clsx from "clsx";

const ModalDelete = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClosed = () => setOpen(false);
  return (
    <>
      <div onClick={handleOpen}>open</div>
      <Modal
        open={open}
        onClose={handleClosed}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <div className="modal-close">
            <IconButton
              classes={{ sizeLarge: classes["icon-button"] }}
              size="large"
              onClick={handleClosed}
            >
              <SvgSelector id="close" />
            </IconButton>
          </div>
          <div className={classes["modal-container"]}>
            <p>Are you sure you want to delete selected tasks?</p>
            <div className={clsx("checkbox-small", classes.checkbox)}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Don’t show this message again"
                />
              </FormGroup>
            </div>
          </div>
          <div className="modal-buttons">
            <button className="gray-button">Cancel</button>
            <button className="blue-button">Confirm</button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalDelete;
