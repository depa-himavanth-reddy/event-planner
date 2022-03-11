import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const StatusNotifier = (props) => {
  const { showNotification, message, actionType } = props;
  const [displayMessage, setDisplayMessage] = useState(showNotification);
  useEffect(() => {
    setDisplayMessage(showNotification);
  }, [showNotification]);
  return (
    <Snackbar
      autoHideDuration={3000}
      style={{ backgroundColor: 'green' }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={displayMessage}
      onClose={() => setDisplayMessage(false)}
    >
      <MuiAlert elevation={6} variant="filled" severity={actionType}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

StatusNotifier.propTypes = {
  showNotification: PropTypes.bool,
  message: PropTypes.string,
  actionType: PropTypes.string
};

StatusNotifier.defaultValues = {
  showNotification: false,
  message: '',
  actionType: 'success'
};
export default StatusNotifier;
