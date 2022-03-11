import React from 'react';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import InputField from '../components/InputField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {AccountCircle, LockOpen, Mail, PhoneAndroid} from '@material-ui/icons';

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
const phoneRegExp = /^((\\+[6-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const validationSchema = yup.object({
  name: yup.string().ensure().required('This field is required'),
  email: yup.string().email().required('This field is required'),
  phoneNumber: yup.string().required("This field is required").matches(phoneRegExp, 'Phone number is not valid').min(10, "Phone number is too short").max(10, "Phone number too long"),
  password: yup.string().required('This field is required').matches(passwordRegExp,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character").min(8, "Password is too short").max(16, "Password is too long"),
});

const UserRegistration = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const userForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: ''
    },
    onSubmit: (values, { resetForm }) => {
      if (values) {
        saveUser();
        resetForm();
      }
    },
    validationSchema: validationSchema
  });
  const saveUser = () => {
    axios.post('http://localhost:8000/users', userForm.values).then((response) => {
      if (response && response.status === 201) {
        navigate('/events');
      }
    });
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ borderRadius: '15px' }}>
        <div className={classes.paper}>
          <Typography variant="h5" color="primary">
            User Registration
          </Typography>
          <form noValidate className={classes.form} onKeyPress={(e) => e.key === 'Enter' && userForm.handleSubmit()}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <InputField formik={userForm} label="Name" name="name" iconComponent={<AccountCircle />} editshrink={true} mandatory={true} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField formik={userForm} label="Email" name="email" iconComponent={<Mail />} editshrink={true} mandatory={true} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField
                  formik={userForm}
                  label="Phone Number"
                  name="phoneNumber"
                  iconComponent={<PhoneAndroid />}
                  editshrink={true}
                  mandatory={true}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField formik={userForm} label="Password" name="password" iconComponent={<LockOpen />} editshrink={true} mandatory={true} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant="contained" onClick={userForm.handleSubmit} color="primary">
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

export default UserRegistration;
