import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Grid,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { forgetPassword } from '../../../api/authentication/login';
const useStyles = makeStyles((theme) => ({
  label: {
    ...theme.typography.label,
  }, //this is for label
  input: {
    ...theme.typography.input,
    borderRadius: '3px',
    background: '#fbfbfd',
    boxShadow: 'none',
    marginTop: '3px',
  },
  inputOutline: {
    border: '1px solid #899298',
  },
  forgetPassword: {
    cursor: 'pointer',
    color: theme.palette.common.primary,
    '&:hover': {
      color: theme.palette.common.darkBlack,
    },
  },
  button: {
    ...theme.typography.button,
  },
}));
export default function FogetPassword(props) {
  const t = props.languageJson;
  const router = useRouter();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [foretPasswordSuccess, setForetPasswordSuccess] = useState(false);

  const [user, setUser] = useState({
    userName: {
      value: '',
      error: false,
      errorMessage: '',
    },
  });

  const submitData = async () => {
    setError({
      status: false,
      message: '',
    });
    if (user.userName.value == '') {
      setUser({
        ...user,
        userName: {
          value: user.userName.value,
          error: true,
          errorMessage: t['Username cannot be empty'],
        },
      });
      return;
    }

    try {
      setLoading(true);
      const response = await forgetPassword(user.userName.value);
      const result = await response.json();
      if (result.status === 'success') {
        setForetPasswordSuccess(true);
      } else {
        setError({
          status: true,
          message: result.message,
        });
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError({
        status: true,
        message: err.message,
      });
    }
  };
  return (
    <Grid container direction="column">
      <Grid item style={{ marginTop: '1em' }}>
        <label htmlFor="header" className={classes.label}>
          {t['Username or Email*']}
        </label>
        <TextField
          id="header"
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            classes: {
              root: classes.input,
              notchedOutline: classes.inputOutline,
            },
          }}
          required
          error={user.userName.error}
          helperText={user.userName.error ? user.userName.errorMessage : ''}
          value={user.userName.value}
          onChange={(e) =>
            setUser({
              ...user,
              userName: {
                value: e.target.value,
                error: false,
                errorMessage: '',
              },
            })
          }
        />
      </Grid>

      {foretPasswordSuccess && (
        <Grid item style={{ marginTop: '1em' }}>
          <Alert severity="success">
            {
              t[
                'Email has been send to your mail address. Please Verify to continue!'
              ]
            }
          </Alert>
        </Grid>
      )}
      {error.status && (
        <Grid item style={{ marginTop: '1em' }}>
          <Typography
            variant="subtitle2"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {' '}
            <ErrorOutlineIcon
              style={{ fill: 'red', marginRight: '4px' }}
            />{' '}
            {error.message}
          </Typography>
        </Grid>
      )}
      <Grid item style={{ marginTop: '1.5em' }}>
        <Button
          fullWidth
          className={classes.button}
          disabled={loading}
          onClick={submitData}
        >
          {loading ? <CircularProgress /> : t['Submit']}
        </Button>
      </Grid>
    </Grid>
  );
}
