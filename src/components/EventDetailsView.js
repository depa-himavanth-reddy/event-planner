import { Grid } from '@material-ui/core';
import React from 'react';
import LabelDataItem from './LabelDataItem';
import PropTypes from 'prop-types';

const EventDetailsView = (props) => {
  const { eventData } = props;
  return (
      <Grid container spacing={2}>
        <Grid item container spacing={1} xs={12} sm={6} alignItems='center'>
          <LabelDataItem labelName="Name" value={eventData.name} />
        </Grid>
        <Grid item container spacing={1} xs={12} sm={6} alignItems='center'>
          <LabelDataItem labelName="Event Started" value={eventData.startDate} />
        </Grid>
        <Grid item container spacing={1} xs={12} sm={6} alignItems='center'>
          <LabelDataItem labelName="Reccurence Type" value={eventData.reccurenceType} />
        </Grid>
      </Grid>
  );
};

EventDetailsView.propTypes={
    eventData: PropTypes.object
}
EventDetailsView.defaultProps={
    eventData: PropTypes.object
}
export default EventDetailsView;
