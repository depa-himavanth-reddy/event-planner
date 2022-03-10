import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';

const DateSelectionControl = (props) => {
  const { id, formik, name, mandatory, labelName, fullWidth } = props;
  return (
    <FormControl fullWidth={fullWidth}>
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          id={id}
          label={labelName}
          margin="normal"
          format="dd-MM-yyyy"
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
        //   onChange={(event) => {
        //     event.target = { name: name, value: event };
        //     onDateSelected(event);
        //   }}
          InputLabelProps={{
            shrink: formik.values[name] ? true : undefined
          }}
          required={mandatory}
          disableFuture={disableFutureDates}
          disablePast={disablePastDates}
        />
      </MuiPickersUtilsProvider> */}
      <TextField
        id={id}
        label={labelName}
        name={name}
        type="date"
        fullWidth = { fullWidth }
        value={formik.values[name]}
        onChange={formik.handleChange}
        InputLabelProps={{
            shrink: true,
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
//   disableFutureDates: PropTypes.bool,
//   disablePastDates: PropTypes.bool,
  fullWidth: PropTypes.bool
};

DateSelectionControl.defaultProps = {
  id: '',
  formik: {},
  name: '',
  mandatory: false,
  labelName: '',
//   disableFutureDates: false,
//   disablePastDates: false,
  fullWidth: false
};

export default DateSelectionControl;
