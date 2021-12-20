import React, { useState } from 'react';
import Head from 'next/head';

import {
  Grid,
  Typography,
  Hidden,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TopBanner from '../src/components/Home/topBanner';
import PopularProducts from '../src/components/Home/popularProducts';
import TrendingCategories from '../src/components/Home/trendingCategories';
import Footer from '../src/resusable/footer';
import Header from '../src/resusable/header';
import OpenShop from '../src/components/Home/openShop';
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
}));

export default function Home(props) {
  const t = props.languageJson;
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container direction="column">
      <Head>
        <title>Home</title>
      </Head>
      <Grid item>
        <Header {...props} languageJson={props.languageJson} />
      </Grid>
      {/* For Home Banner */}
      <Grid
        item
        style={{ marginTop: matchesSM ? '1em' : '5em' }}
        className={classes.root}
      >
        <TopBanner languageJson={props.languageJson} />
      </Grid>

      <Grid item style={{ marginTop: '5em' }} className={classes.root}>
        <PopularProducts
          languageJson={props.languageJson}
          Graphics={props.Graphics}
          Fonts={props.Fonts}
        />
      </Grid>
      <Grid item style={{ marginTop: '5em' }} className={classes.root}>
        <TrendingCategories
          categories={props.categories.slice(0, 6)}
          languageJson={props.languageJson}
        />
      </Grid>
      <Grid item direction="column" container style={{ marginTop: '2em' }}>
        <OpenShop languageJson={props.languageJson} />
      </Grid>
      <Grid item>
        <Footer languageJson={props.languageJson} />
      </Grid>
    </Grid>
  );
}
