import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

const DateSelectionControl = (props) => {
  const { id, formik, name, mandatory, labelName, fullWidth } = props;
  return (
    <FormControl fullWidth={fullWidth}>
      <TextField
        id={id}
        label={labelName}
        name={name}
        type="date"
        fullWidth={fullWidth}
        value={formik.values[name]}
        onChange={formik.handleChange}
        InputLabelProps={{
          shrink: true
        }}
        required={mandatory}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      />
    </FormControl>
  );
};
DateSelectionControl.propTypes = {
  id: PropTypes.string,
  formik: PropTypes.object,
  name: PropTypes.string,
  mandatory: PropTypes.bool,
  labelName: PropTypes.string,
  fullWidth: PropTypes.bool
};

DateSelectionControl.defaultProps = {
  id: '',
  formik: {},
  name: '',
  mandatory: false,
  labelName: '',
  fullWidth: false
};

export default DateSelectionControl;
