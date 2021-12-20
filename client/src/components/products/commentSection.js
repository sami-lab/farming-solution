import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const CommentSection = ({ image, name, rating, message, date }) => {
  return (
    <Grid container direction="column">
      <Grid item container spacing={2}>
        <Grid item>
          <img width="50px" height="50px" src={image} alt="avatar" />
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle2"
            style={{ fontSize: '1rem', fontWeight: '700' }}
          >
            {name}
          </Typography>
          <Rating
            style={{ fontSize: '17px' }}
            name="read-only"
            value={rating}
            readOnly
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{date.toDateString()}</Typography>
        </Grid>
      </Grid>
      <Grid item container>
        <Typography variant="subtitle2">{message}</Typography>{' '}
      </Grid>
    </Grid>
  );
};

export default CommentSection;
