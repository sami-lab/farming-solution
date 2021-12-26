import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  label: {
    ...theme.typography.label,
  },
  card: {
    backgroundColor: '#f4f8fb',
    height: '180px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '1em',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}));

export default function TrendingCategories(props) {
  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h2" style={{ fontWeight: '500' }}>
              Browse Trending Categories
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify="center" spacing={2}>
          {props.categories.map((item, i) => (
            <Grid item md={2} key={i} sm={4} xs={6}>
              <Card elevation={0} className={classes.card}>
                <img
                  alt={item.title}
                  src={item.image}
                  style={{
                    width: '120px',
                    marginBottom: '1em',
                  }}
                />
                <label
                  className={classes.label}
                  style={{ textAlign: 'center' }}
                >
                  {item.title}
                </label>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
