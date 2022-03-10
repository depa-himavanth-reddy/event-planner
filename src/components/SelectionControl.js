import React from 'react';
import { InputLabel, MenuItem, FormControl, Select, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';

const SelectionControlField = (props) => {
  const { name, formik, labelName, mandatory } = props;
  
  return (
    <FormControl fullWidth>
      <InputLabel id="labelID" required={mandatory}>
        {labelName}
      </InputLabel>
      <Select
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        required={mandatory}
      >
        <MenuItem value="day" >Today</MenuItem>
        <MenuItem value="week">This week</MenuItem>
        <MenuItem value="month">This month</MenuItem>
        <MenuItem value="year">This year</MenuItem>
      </Select>
      <FormHelperText style={{ color: 'red' }}>{formik.touched[name] && formik.errors[name]}</FormHelperText>
    </FormControl>
  );
};
SelectionControlField.propTypes = {
  name: PropTypes.string,
  formik: PropTypes.object,
  labelName: PropTypes.string,
  mandatory: PropTypes.bool
};

SelectionControlField.defaultProps = {
  name: '',
  formik: {},
  labelName: '',
  mandatory: false
};
export default SelectionControlField;
