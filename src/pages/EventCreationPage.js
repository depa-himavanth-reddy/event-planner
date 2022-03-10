import React from 'react';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import InputField from '../components/InputField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DateSelectionControl from '../components/DateSelectionControl';
import SelectionControlField from '../components/SelectionControl';
import parse from 'date-fns/parse';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4),
    padding: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    verticalAlign: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5)
  }
}));
const validationSchema = yup.object({
  name: yup.string().required('This field is required').max(30, 'Name is too long'),
  reccurenceType: yup.string().required('This field is required'),
  startDate: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, 'dd-MM-yyyy', new Date());
      return result;
    })
    .typeError('please enter a valid date')
    .required('This field is required'),
  endDate: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, 'dd-MM-yyyy', new Date());
      return result;
    })
    .typeError('please enter a valid date')
    .min(yup.ref('startDate'), "end date can't be before start date"),
  description: yup.string()
});

const EventCreationPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const eventForm = useFormik({
    initialValues: {
      name: '',
      reccurenceType: 'day',
      startDate: '',
      endDate: '',
      description: ''
    },
    onSubmit: (values, { resetForm }) => {
      if (values) {
        createEvent();
        resetForm();
      }
    },
    enableReinitialize: true,
    validationSchema: validationSchema
  });
  console.log(eventForm);
  const createEvent = () => {
    axios.post('http://localhost:8000/events', eventForm.values).then((response) => {
      if (response && response.status === 201) {
        navigate('/events');
      }
    });
  };
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ borderRadius: '15px' }}>
        <div className={classes.paper}>
          <Typography variant="h5" color="primary">
            Create Event
          </Typography>
          <form noValidate className={classes.form} onKeyPress={(e) => e.key === 'Enter' && eventForm.handleSubmit()}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField formik={eventForm} label="Name" name="name" editshrink={true} mandatory={true} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectionControlField
                  labelName="Select recurrence"
                  formik={eventForm}
                  label="Reccurenece Type"
                  name="reccurenceType"
                  editshrink={true}
                  mandatory={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateSelectionControl
                  formik={eventForm}
                  id="startDate"
                  name="startDate"
                  mandatory={true}
                  labelName="Event start date"
                  disableFutureDates={false}
                  disablePastDates={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateSelectionControl
                  formik={eventForm}
                  id="endDate"
                  name="endDate"
                  mandatory={true}
                  labelName="Event end date"
                  disableFutureDates={false}
                  disablePastDates={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField formik={eventForm} label="Description" name="description" editshrink={true} mandatory={true} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant="contained" onClick={eventForm.handleSubmit} color="primary">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </Container>
  );
};

export default EventCreationPage;
