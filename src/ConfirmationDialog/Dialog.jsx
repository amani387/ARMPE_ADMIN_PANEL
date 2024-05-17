import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationDialog = ({ open, onClose, onConfirm, actionType }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`Confirm ${actionType}`}</DialogTitle>
      <DialogContent>
        Are you sure you want to {actionType} ?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" >
          {actionType}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
