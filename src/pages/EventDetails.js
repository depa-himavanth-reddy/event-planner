import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import SelectionControlField from '../components/SelectionControl';
import { useFormik } from 'formik';
import axios from 'axios';
import EventDetailsView from '../components/EventDetailsView';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { todayDate, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from '../utils/Date';
import LabelDataItem from '../components/LabelDataItem';

const EventDetails = () => {
  const navigate = useNavigate();
  const eventID = useParams();
  const [eventData, setEventData] = useState({});
  const redirectToEventCreation = () => {
    navigate('/events');
  };

  useEffect(() => {
    loadEventData();
  }, []);
  const loadEventData = async () => {
    const response = await axios.get(`http://localhost:8000/events/${eventID}`);
    if (response && response.status === 200) {
      setEventData(response.data);
    }
  };
  const getNextOccureneces = () => {
      return [].filter((event) => event.startDate === todayDate);
    
  };
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={redirectToEventCreation} color="primary">
            Back
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6">Event Details : </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
            <CompleteEventDetailsView event={eventData}/>
        </Grid>
        <Grid item xs={12} sm={8} alignItems="center">
          {(getNextOccureneces().length > 0 &&
            getNextOccureneces().map((event) => {
              return <CompleteEventDetailsView key={event.id} event={event}/>
            })) || 'No Events found'}
        </Grid>
      </Grid>
    </Container>
  );
};
const CompleteEventDetailsView = (props) => {
  const { event } = props;
  return (
    <Box padding={2} key={event.id}>
      <Card style={{ padding: 12 }} elevation={2}>
        <CardContent>
          <Grid container spacing={2}>
            <EventDetailsView eventData={event} />
            <Grid item container spacing={1} xs={12} sm={6} alignItems="center">
              <LabelDataItem labelName="End Date" value={event.endDate} />
            </Grid>
            <Grid item container spacing={1} xs={12} sm={6} alignItems="center">
              <LabelDataItem labelName="Description" value={event.description} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
export default EventDetails;
