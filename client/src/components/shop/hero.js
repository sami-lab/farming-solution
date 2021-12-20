import React from 'react';
import {
  Button,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { useRouter } from 'next/router';
export default function Hero(props) {
  const t = props.languageJson;

  const router = useRouter();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <img
          src="/dev/heroShop.png"
          style={{ width: '25em', height: '15em' }}
        />
      </Grid>
      <Grid item>
        <Typography
          variant="h1"
          align="center"
          style={{ fontSize: '4rem', fontWeight: 500 }}
        >
          {t['Power to the creators!']}
        </Typography>
      </Grid>
      <Grid
        item
        style={{ width: matchesSM ? '80%' : '65%', marginBottom: '1em' }}
      >
        <Typography
          vairent="h2"
          align="center"
          style={{
            fontWeight: 400,
            lineHeight: 1.5,
            textShadow: ' 0 1px 0 rgb(0 0 0 / 25%)',
          }}
        >
          {
            t[
              'Welcome to the marketplace built to support amazing Farm to Home producers like you.'
            ]
          }
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          style={{
            background: props.shopPending
              ? 'gray'
              : theme.palette.common.primary,
            padding: '7px 20px',
            opacity: props.shopPending ? 0.7 : 1,
          }}
          disabled={props.shopPending}
          onClick={() =>
            props.shopApproved ? router.push('/shop/myShop') : props.openModal
          }
        >
          <Typography
            variant="h6"
            style={{ color: props.shopPending ? '#000' : '#fff' }}
          >
            {props.shopApproved
              ? t['Visit Shop']
              : props.shopPending
              ? t['Shop is Pending']
              : t['Open a Shop']}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
