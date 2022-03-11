import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import SelectionControlField from '../components/SelectionControl';
import { useFormik } from 'formik';
import axios from 'axios';
import EventDetailsView from '../components/EventDetailsView';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { todayDate, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from '../utils/Date';
const Events = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    display: false,
    selectedEvent: {}
  });
  const [events, setEvents] = useState([]);
  const eventForm = useFormik({
    initialValues: {
      reccurenceType: 'day'
    }
  });
  const redirectToEventCreation = () => {
    navigate('/create_event');
  };
  const redirectToEventView = (eventID) => {
    navigate(`/event_details/${eventID}`);
  };
  useEffect(() => {
    loadEvents();
  }, []);
  const loadEvents = async () => {
    const response = await axios.get(`http://localhost:8000/events/`);
    if (response && response.status === 200) {
      setEvents(response.data);
    }
  };
  const getEvents = (reccurenceType) => {
    if (reccurenceType === 'day') {
      return events.filter((event) => event.startDate === todayDate);
    } else if (reccurenceType === 'week') {
      return events.filter((event) => event.startDate >= startOfWeek && event.startDate <= endOfWeek);
    } else if (reccurenceType === 'month') {
      return events.filter((event) => event.startDate >= startOfMonth && event.startDate <= endOfMonth);
    } else if (reccurenceType === 'year') {
      return events.filter((event) => event.startDate >= startOfYear && event.startDate <= endOfYear);
    }
  };
  const onDeleteSelected = () => {
    axios.delete(`http://localhost:8000/events/${state.selectedEvent.id}`).then((response) => {
      if (response && response.status === 200) {
        onCloseDialog();
        loadEvents();
      }
    });
  };
  const onCloseDialog = () => {
    setState({ ...state, display: false, selectedEvent: {} });
  };
  const onRequestDeleteEvent = (event) => {
    setState({ ...state, display: true, selectedEvent: event });
  };
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={redirectToEventCreation} color="primary">
            Create Event
          </Button>
        </Grid>
        <Grid item xs={5}>
          <SelectionControlField
            labelName="Select recurrence"
            formik={eventForm}
            label="Reccurenece Type"
            name="reccurenceType"
            editshrink={true}
            mandatory={true}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6">Events : </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {(getEvents(eventForm.values.reccurenceType).length > 0 &&
            getEvents(eventForm.values.reccurenceType).map((event) => {
              return (
                <Box py={1} key={event.id}>
                  <Card elevation={2}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <EventDetailsView eventData={event} />
                        </Grid>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" color="primary" onClick={() => redirectToEventView(event.id)}>
                        Show Event
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => onRequestDeleteEvent(event)}>
                        Delete Event
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              );
            })) ||
            'No Events found'}
        </Grid>
      </Grid>
      <ConfirmationDialog display={state.display} closeDialog={onCloseDialog} onDeleteSelected={onDeleteSelected} />
    </Container>
  );
};

export default Events;
