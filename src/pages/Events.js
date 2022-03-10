import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import SelectionControlField from '../components/SelectionControl';

const Events = () => {
  const navigate = useNavigate();
  const redirectToEventCreation = () => {
    navigate('/create_event');
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button variant="contained" onClick={redirectToEventCreation} color="primary">
          Create Event
        </Button>
      </Grid>
      <Grid item xs={6}>
        <SelectionControlField />
      </Grid>
    </Grid>
  );
};

export default Events;
