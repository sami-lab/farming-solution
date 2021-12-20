import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F4F8FB',
    marginBottom: 0,
    paddingBottom: '0.5em',
    paddingTop: '0.5em',
  },
  desktopItemPadding: {
    padding: '10px 16px 0px 16px',
  },
  desktopItem: {
    ...theme.typography.label,
    color: theme.palette.common.darkBlack,
    fontWeight: 700,
    color: '#000',
    paddingBottom: '13px',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.common.primary,
      borderBottom: `4px solid ${theme.palette.common.primary}`,
    },
  },
}));
export default function AuthFooter(props) {
  const classes = useStyles();
  const t = props.languageJson;
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid
        item
        className={classes.desktopItemPadding}
        style={{ paddingLeft: 0 }}
      >
        <Typography className={classes.desktopItem}>{t['Terms']} </Typography>
      </Grid>
      <Grid item className={classes.desktopItemPadding}>
        <Typography className={classes.desktopItem}>
          {t['Cookie Policy']}{' '}
        </Typography>
      </Grid>
      <Grid item className={classes.desktopItemPadding}>
        <Typography className={classes.desktopItem}>
          {t['Privacy Policy']}{' '}
        </Typography>
      </Grid>
      <Grid item className={classes.desktopItemPadding}>
        <Typography className={classes.desktopItem}>
          {t['CA Privacy Policy']}
        </Typography>
      </Grid>
    </Grid>
  );
}
