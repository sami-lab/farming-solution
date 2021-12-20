import React from 'react';
import {
  Grid,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const chipSample = [
  {
    text: 'Procreate Brushes',
    link: '#',
  },
  {
    text: 'Textures',
    link: '#',
  },
  {
    text: 'Instagram',
    link: '#',
  },
];
const useStyles = makeStyles((theme) => ({
  brush: {
    position: 'relative',
    zIndex: 1,
    display: 'inline-block',
    background: 'url(/dev/brush-stroke1.webp) 0 0 no-repeat',
    backgroundSize: '102% 100%',
    '&::before': {
      content: '',
      position: 'absolute',
      zIndex: -1,
      top: 0,
      left: '-1px',
      width: '99%',
      height: '94.8%',
      transform: 'scale(1.1)',
    },
  },
  label: {
    ...theme.typography.label,
  },
  chip: {
    backgroundColor: '#fee4c3',
    padding: '6px 12px',
    '&:hover': {
      backgroundColor: '#FCC875',
    },
  },
}));

export default function TopBanner(props) {
  const t = props.languageJson;

  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const trending = (
    <>
      <Grid item>
        <Typography variant="h3">{t['TRENDING NOW']}</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          {chipSample.map((item, i) => (
            <Grid item key={i}>
              <Chip
                label={<label className={classes.label}>{item.text}</label>}
                component="a"
                href={item.link}
                clickable
                className={classes.chip}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
  return (
    <Grid container justify="space-between">
      <Grid item md={4}>
        <Grid container direction="column" spacing={2}>
          {/* For text  */}
          <Grid item>
            <Typography variant="h1" align={matchesSM ? 'center' : 'left'}>
              {t['Join forces with']}{' '}
              <span className={classes.brush}>{t['talented designers']}</span>{' '}
              {t['around the world.']}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h2" align={matchesSM ? 'center' : 'left'}>
              {
                t[
                  'Accelerate your projects with millions of ready-to-use products.'
                ]
              }
            </Typography>
          </Grid>
          {!matchesSM && trending}
        </Grid>
      </Grid>

      <Grid item md={7} xs={12}>
        <Grid container direction="column" spacing={2}>
          {/* for Image */}
          <Grid item style={{ marginTop: '20px' }}>
            <img
              src="/dev/home_banner.webp"
              alt="login"
              style={{ width: '100%', height: '100%' }}
            />
          </Grid>
          {/* For text  */}
          <Grid item>
            <label className={classes.label}>
              {t['Explore hundreds of ready-to-use designs in']}{' '}
              <a
                href="#"
                style={{
                  textDecoration: 'none',
                  color: theme.palette.common.primary,
                }}
              >
                {' '}
                {t['our Canva Finds »']}
              </a>
            </label>
          </Grid>
          {matchesSM && trending}
        </Grid>
      </Grid>
    </Grid>
  );
}
