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

import ForgetPasswordForm from '../src/components/authentication/forgetPassword';
import AuthHeader from '../src/resusable/authHeader';
import AuthFooter from '../src/resusable/footer';

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
  ruled: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid #e2e9ee',
    lineHeight: 0,
    color: '#899298',
  },
}));

export default function ForgetPassword(props) {
  const t = props.languageJson;
  const router = useRouter();
  if (props.user !== null && props.userToken !== null) router.push('/');

  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Head>
        <title>Forget Password</title>
      </Head>
      <AuthHeader />
      <Grid container justify="space-between" className={classes.root}>
        <Hidden smDown>
          <Grid item md={7}>
            <Grid container direction="column" spacing={2}>
              {/* For text  */}
              <Grid item>
                <Typography variant="h4">
                  {
                    t[
                      'Welcome to the marketplace built to support amazing Farm to Home producers like you.'
                    ]
                  }
                </Typography>
              </Grid>
              {/* for Image */}
              <Grid item>
                <img
                  src="/dev/helpline.png"
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
              <Typography variant="subtitle1">
                {t['Forgot your password?']}
              </Typography>
            </Grid>
            {/* for form */}
            <Grid item>
              {' '}
              <ForgetPasswordForm {...props} languageJson={t} />
            </Grid>
            {/* for Line */}
            <Grid item style={{ marginTop: '2.5em' }}>
              <div className={classes.ruled}>
                <span
                  style={{
                    background: '#fff',
                    padding: '0 20px',
                    fontSize: '1.25rem',
                    fontFamily: 'Averta',
                  }}
                >
                  {t['OR']}
                </span>
              </div>
            </Grid>
            {/* for Signup */}
            <Grid item style={{ alignSelf: 'center', marginTop: '1.5em' }}>
              <Typography variant="subtitle1">
                {t['New around here?']}{' '}
                <Link href="/signup">
                  <a
                    style={{
                      textDecoration: 'none',
                      color: theme.palette.common.primary,
                    }}
                  >
                    {t['Sign up!']}
                  </a>
                </Link>{' '}
              </Typography>
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
