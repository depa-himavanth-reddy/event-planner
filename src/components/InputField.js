import { TextField } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const InputField = (props) => {
  const { formik, label, name, iconComponent, editshrink, mandatory } = props;
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      required={mandatory}
      onChange={formik.handleChange}
      InputProps={{
        endAdornment: iconComponent
      }}
      InputLabelProps={{ shrink: editshrink }}
      value={formik.values[name]}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  );
};

InputField.propTypes = {
  formik: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  iconComponent: PropTypes.element,
  editshrink: PropTypes.bool,
  mandatory: PropTypes.bool
};
InputField.defaultProps = {
  formik: {},
  label: '',
  name: '',
  iconComponent: React.createElement('span'),
  editshrink: false,
  mandatory: false
};
export default InputField;
