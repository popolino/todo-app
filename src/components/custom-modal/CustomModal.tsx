import React from "react";
import { Box, IconButton, Modal } from "@mui/material";
import classes from "./CustomModal.module.scss";
import SvgSelector from "../svgSelector/SvgSelector";
import clsx from "clsx";

type TCustomModalProps = {
  children: JSX.Element;
  open: boolean;
  loading?: boolean;
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
  loading,
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
              className={clsx("blue-button", { disabled: disabled })}
              onClick={onConfirm}
              disabled={disabled || loading}
            >
              {loading ? (
                <SvgSelector id="preloader" className="preloader" />
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CustomModal;
