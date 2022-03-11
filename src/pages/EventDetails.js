import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Typography } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import EventDetailsView from '../components/EventDetailsView';
import LabelDataItem from '../components/LabelDataItem';
import moment from 'moment';
import { todayDate } from '../utils/Date';

const EventDetails = () => {
  const navigate = useNavigate();
  const { eventID } = useParams();
  const [eventData, setEventData] = useState({});
  const [upcomingEventsData, setUpcomingEventsData] = useState([]);
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
      getNextOccureneces(response.data);
    }
  };
  const getNextOccureneces = (eventDetails) => {
    const enumarentType = {
      day: 'days',
      week: 'weeks',
      month: 'months',
      year: 'years'
    };
    const upcomingEvents = [];
    if (eventDetails.reccurenceType && eventDetails.reccurenceType !== 'once') {
      for (var i = 1; i <= 5; i++) {
        console.log('true');
        if (eventDetails.reccurenceType !== '' && eventDetails.endDate === '') {
          upcomingEvents.push(moment(eventDetails.startDate).add(i, enumarentType[eventDetails.reccurenceType]).format('YYYY-MM-DD'));
        } else if (eventDetails.reccurenceType !== '' && eventDetails.endDate !== '') {
          const upcomingEventDate = moment(eventDetails.startDate).add(i, enumarentType[eventDetails.reccurenceType]).format('YYYY-MM-DD');
          if (upcomingEventDate <= eventDetails.endDate) {
            upcomingEvents.push(upcomingEventDate);
          }
        }
      }
    }
    setUpcomingEventsData(upcomingEvents);
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
          <CompleteEventDetailsView event={eventData} upcomingEventsData={upcomingEventsData} />
        </Grid>
      </Grid>
    </Container>
  );
};
const CompleteEventDetailsView = (props) => {
  const { event, upcomingEventsData } = props;
  return (
    <Box padding={2} key={event.id}>
      <Card style={{ padding: 12 }} elevation={2}>
        <CardContent>
          <Grid container spacing={2}>
            <EventDetailsView eventData={event} />
            <Grid item container spacing={1} xs={12} sm={6} alignItems="center">
              <LabelDataItem labelName="Event End Date" value={event.endDate} />
            </Grid>
            <Grid item container spacing={1} xs={12} sm={6} alignItems="center">
              <LabelDataItem labelName="Description" value={event.description} />
            </Grid>
            <Grid item container spacing={1} xs={12} sm={6} alignItems="center">
              <Grid item xs={4}>
                <Typography variant="caption" component="span">
                    <Box fontWeight="bold">Upcoming Events:</Box>                  
                </Typography>
              </Grid>
              <Grid item xs={1}>
                :
              </Grid>
              <Grid item xs={7}>
                {upcomingEventsData.length > 0
                  ? upcomingEventsData.map((date,index) => <Chip size="small" key={index} label={date} color="primary" />)
                  : 'No Upcoming events details found'}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDetails;
