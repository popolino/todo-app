import React from "react";
import { Box, IconButton, Modal } from "@mui/material";
import classes from "./CustomModal.module.scss";
import SvgSelector from "../svgSelector/SvgSelector";

type TCustomModalProps = {
  children: JSX.Element;
  open: boolean;
  disabled?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const CustomModal: React.FC<TCustomModalProps> = ({
  children,
  open,
  disabled,
  onClose,
  onConfirm,
}) => {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box className="modal">
          <div className="modal-close">
            <IconButton
              classes={{ sizeLarge: classes["icon-button"] }}
              size="large"
              onClick={onClose}
            >
              <SvgSelector id="close" />
            </IconButton>
          </div>
          <div className={classes["modal-container"]}>{children}</div>
          <div className="modal-buttons">
            <button className="gray-button" onClick={onClose}>
              Cancel
            </button>
            <button
              className="blue-button"
              onClick={onConfirm}
              disabled={disabled}
            >
              Confirm
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CustomModal;
