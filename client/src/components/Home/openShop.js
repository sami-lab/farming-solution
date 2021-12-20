import React from 'react';
import {
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from '../../resusable/Link';
import { useRouter } from 'next/router';
const useStyles = makeStyles((theme) => ({
  label: {
    ...theme.typography.label,
    fontWeight: '300',
  },
}));
export default function OpenShop(props) {
  const t = props.languageJson;

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const classes = useStyles();

  return (
    <Grid
      container
      direction={matchesSM ? 'column' : 'row'}
      style={{
        backgroundImage: 'url(/dev/categorybottom.webp)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '80px 0',
      }}
    >
      <Grid
        item
        md={6}
        xs={12}
        style={{ borderRight: matchesSM ? 0 : '1px solid #ccd4da' }}
      >
        <Grid container direction="column" alignItems="center">
          <Typography
            variant="subtitle2"
            style={{
              marginBottom: '0.1em',
              textAlign: 'center',
              fontWeight: '700',
            }}
          >
            {t['Share Creative Market & Earn Cash']}
          </Typography>
          <Typography className={classes.label} align="center">
            {t['Start sharing to earn 15% on all new customer orders.']}
          </Typography>
          <Link style={{ textDecoration: 'none' }} href="/partner">
            <Button
              variant="outlined"
              style={{
                backgroundColor: '#4b5258',

                marginTop: '1em',
              }}
            >
              <Typography variant="subtitle2" style={{ color: '#fff' }}>
                {' '}
                {t['Become an Affiliate']}
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12} style={{ marginTop: matchesSM ? '2em' : 0 }}>
        <Grid container direction="column" alignItems="center">
          <Typography
            variant="subtitle2"
            style={{
              marginBottom: '0.1em',
              textAlign: 'center',
              fontWeight: '700',
            }}
          >
            {t['Sell Your Products']}
          </Typography>
          <Typography className={classes.label} align="center">
            {t['Open your shop and reach millions of buyers.']}
          </Typography>
          <Link style={{ textDecoration: 'none' }} href="/partner">
            <Button
              variant="outlined"
              style={{
                backgroundColor: '#4b5258',
                marginTop: '1em',
              }}
            >
              <Typography variant="subtitle2" style={{ color: '#fff' }}>
                {' '}
                {t['Open a Shop']}
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
