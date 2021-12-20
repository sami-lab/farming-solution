import React from 'react';
import { Grid, Typography } from '@material-ui/core';
export default function noRecords(props) {
  const t = props.languageJson;

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ marginTop: '5em' }}
    >
      <Grid item>
        <Typography
          variant="subtitle2"
          component="h1"
          style={{
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          {t['NO PURCHASE FOUND']}
        </Typography>
        <Grid item style={{ marginTop: '2em' }}>
          <Typography
            variant="h1"
            style={{
              textAlign: 'center',
            }}
          >
            {t["More Products You'll Love"]}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            style={{
              textAlign: 'center',
            }}
          >
            {t["Didn't find what you are looking for?"]}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              textAlign: 'center',
            }}
          >
            {t['Check out these popular products.']}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
