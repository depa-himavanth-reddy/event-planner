import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

function LabelDataItem(props) {
  const { labelName, value } = props;
  return (
    <React.Fragment>
      <Grid item xs={4} align="left">
        <Typography variant="caption" component="span">
          <Box fontWeight="bold">{labelName}</Box>
        </Typography>
      </Grid>
      <Grid item xs={1}>
        :
      </Grid>
      <Grid item xs={7} align="left">
        <Typography variant="caption" component="span">
          {value}
        </Typography>
      </Grid>
    </React.Fragment>
  );
}

LabelDataItem.propTypes = {
  labelName: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array, PropTypes.object]),
  labelNameSize: PropTypes.number,
  valueSize: PropTypes.number
};

LabelDataItem.defaultProps = {
  labelName: '',
  value: '',
  labelNameSize: 4,
  valueSize: 7
};

export default LabelDataItem;
