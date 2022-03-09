import React from 'react';
import { InputLabel, MenuItem, FormControl, Select, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';

const SelectionControlField = (props) => {
  const { name, formik, labelName, options, mandatory } = props;
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
        {options.length > 0 ? (
          options.map((option) => {
            return (
              <MenuItem key={option.id} value={option.value}>
                {option.name}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem value="">No Data</MenuItem>
        )}
      </Select>
      <FormHelperText style={{ color: 'red' }}>{formik.touched[name] && formik.errors[name]}</FormHelperText>
    </FormControl>
  );
};
SelectionControlField.propTypes = {
  name: PropTypes.string,
  formik: PropTypes.object,
  labelName: PropTypes.string,
  options: PropTypes.array,
  mandatory: PropTypes.bool
};

SelectionControlField.defaultProps = {
  name: '',
  formik: {},
  labelName: '',
  options: [],
  mandatory: false
};
export default SelectionControlField;
