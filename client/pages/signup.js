import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Link from 'next/link';
import {
  Grid,
  Typography,
  Hidden,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SignUpForm from '../src/components/authentication/signup';
import AuthHeader from '../src/resusable/authHeader';
import AuthFooter from '../src/resusable/authFooter';

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

export default function SignUp(props) {
  const t = props.languageJson;
  const router = useRouter();
  if (props.user !== null && props.userToken !== null) router.push('/');

  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AuthHeader />
      <Head>
        <title>Signup</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid container justify="space-between" className={classes.root}>
        <Hidden smDown>
          <Grid item md={7}>
            <Grid container direction="column" spacing={2}>
              {/* For text  */}
              <Grid item>
                <Typography variant="h1">
                  {
                    t[
                      'Discover digital assets created by talented artists around the world.'
                    ]
                  }
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
              <Typography variant="subtitle1">
                {t['Sign up for Creative Market']}
              </Typography>
            </Grid>
            {/* for form */}
            <Grid item>
              {' '}
              <SignUpForm {...props} languageJson={t} />
            </Grid>
            <Grid item style={{ alignSelf: 'center', marginTop: '1.5em' }}>
              <Typography variant="subtitle2" align="center">
                {t['By creating an account, you agree to our']}{' '}
                <span
                  style={{
                    cursor: 'pointer',
                    fontWeight: '700',
                    color: theme.palette.common.primary,
                  }}
                >
                  {t['terms']}
                </span>{' '}
                {t['and']}{' '}
                <span
                  style={{
                    cursor: 'pointer',
                    fontWeight: '700',
                    color: theme.palette.common.primary,
                  }}
                >
                  {' '}
                  {t['privacy policy']}
                </span>
              </Typography>
            </Grid>

            {/* for signin */}
            <Grid item style={{ alignSelf: 'center', marginTop: '1.5em' }}>
              <Typography variant="subtitle1">
                {t['Have an account?']}{' '}
                <Link href="/login">
                  <a
                    style={{
                      textDecoration: 'none',
                      color: theme.palette.common.primary,
                    }}
                  >
                    {' '}
                    {t['Log In!']}
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
