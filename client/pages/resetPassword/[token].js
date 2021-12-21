import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Grid,
  Typography,
  Hidden,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AuthHeader from '../../src/resusable/authHeader';
import AuthFooter from '../../src/resusable/authFooter';
import ResetPassword from '../../src/components/authentication/resetPassword';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '3.5em',
    paddingLeft: '10em',
    paddingRight: '10em',

    [theme.breakpoints.down('sm')]: {
      paddingTop: '1em',
      paddingLeft: '1em',
      paddingRight: '1em',
    },
  },
}));

export default function Login(props) {
  const t = props.languageJson;
  const router = useRouter();
  if (props.user !== null && props.userToken !== null) router.push('/');

  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <AuthHeader />
      <Grid container justify="space-between" className={classes.root}>
        <Hidden smDown>
          <Grid item md={7}>
            <Grid container direction="column" spacing={2}>
              {/* For text  */}
              <Grid item>
                <Typography variant="h1">
                  {t['Welcome back to the world’s marketplace for design']}
                </Typography>
              </Grid>
              {/* for Image */}
              <Grid item>
                <img
                  src="/dev/login.webp"
                  alt="login"
                  style={{ width: '100%', height: '100%' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid
          item
          md={5}
          xs={12}
          style={{ paddingLeft: matchesSM ? 0 : '4em' }}
        >
          <Grid container direction="column">
            {/* For heading  */}
            <Grid item>
              <Typography variant="subtitle1">{t['Reset password']}</Typography>
            </Grid>
            {/* for form */}
            <Grid item>
              {' '}
              <ResetPassword {...props} languageJson={t} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div style={{ marginTop: '2em' }}>
        <AuthFooter languageJson={t} />
      </div>
    </>
  );
}
