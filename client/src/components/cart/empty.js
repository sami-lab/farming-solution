import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '10em',
    paddingRight: '10em',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '3em',
      paddingRight: '3em',
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '1em',
      paddingRight: '1em',
    },
  },
  alert: {
    padding: '4px 16px',
  },
}));

export default function Cart(props) {
  const t = props.languageJson;

  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item style={{ marginTop: '2em' }} className={classes.root}>
        <Alert
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#DCEEFC',
          }}
          classes={{
            root: classes.alert,
          }}
          icon={<div></div>}
        >
          {' '}
          <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
            {' '}
            {t['Your Cart is Empty.']}{' '}
            <a href="#" style={{ color: '#303538' }}>
              {t['Find something that inspires you.']}
            </a>
          </Typography>
        </Alert>
      </Grid>
      <Grid item style={{ marginTop: '2em' }} className={classes.root}>
        {' '}
        <img src="/dev/empty-cart.png" style={{ width: '100%' }} />
      </Grid>
    </Grid>
  );
}
