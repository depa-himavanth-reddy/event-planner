import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const ConfirmationDialog = (props) => {
  const { display, onDeleteSelected, closeDialog } = props;
  return (
    <Dialog open={display} onClose={closeDialog} >
      <DialogTitle >Delete</DialogTitle>
      <DialogContent>
        <DialogContentText >
          Are you sure, you want to remove this event?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDeleteSelected} variant="contained" color="primary">
          Yes
        </Button>
        <Button onClick={closeDialog} variant="contained" color="secondary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  display: PropTypes.bool,
  onDeleteSelected: PropTypes.func,
  closeDialog: PropTypes.func
};
ConfirmationDialog.defaultProps = {
  display: false,
  onDeleteSelected: () => {},
  closeDialog: () => {}
};
export default ConfirmationDialog;
