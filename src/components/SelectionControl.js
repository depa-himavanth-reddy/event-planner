import React from 'react';
import { InputLabel, MenuItem, FormControl, Select, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';

const SelectionControlField = (props) => {
  const { name, formik, labelName, mandatory, options } = props;
  
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
        {options.map(option=><MenuItem key ={option.id} value={option.value} >{option.label}</MenuItem>)}
      </Select>
      <FormHelperText style={{ color: 'red' }}>{formik.touched[name] && formik.errors[name]}</FormHelperText>
    </FormControl>
  );
};
SelectionControlField.propTypes = {
  name: PropTypes.string,
  formik: PropTypes.object,
  options: PropTypes.array,
  labelName: PropTypes.string,
  mandatory: PropTypes.bool
};

SelectionControlField.defaultProps = {
  name: '',
  formik: {},
  options: [],
  labelName: '',
  mandatory: false
};
export default SelectionControlField;
