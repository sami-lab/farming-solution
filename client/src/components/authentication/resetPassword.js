import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Grid,
  Button,
  TextField,
  IconButton,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { resetPassword } from '../../../api/authentication/login';
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
export default function ResetPassword(props) {
  const t = props.languageJson;
  const router = useRouter();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [user, setUser] = useState({
    password: {
      value: '',
      error: false,
      errorMessage: '',
    },
    confirmPassword: {
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

    if (user.password.value === '') {
      setUser({
        ...user,
        password: {
          value: user.password.value,
          error: true,
          errorMessage: t['Password cannot be empty'],
        },
      });
      return;
    }
    if (user.confirmPassword.value === '') {
      setUser({
        ...user,
        confirmPassword: {
          value: user.confirmPassword.value,
          error: true,
          errorMessage: t['Password cannot be empty'],
        },
      });
      return;
    }
    if (user.password.value !== user.confirmPassword.value) {
      setError({
        active: true,
        message: t['Password and confirm Password doesnot match'],
      });
      return;
    }
    try {
      setLoading(true);
      const response = await resetPassword(
        user.password.value,
        user.confirmPassword.value,
        router.query.token
      );
      const result = await response.json();
      if (result.status === 'success') {
        router.push('/login');
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
        <Grid container justify="space-between">
          <Grid item>
            <label htmlFor="passsword" className={classes.label}>
              {t['New Password*']}
            </label>
          </Grid>
        </Grid>

        <TextField
          placeholder="New Password"
          variant="outlined"
          fullWidth
          size="small"
          type={showPassword ? 'text' : 'password'}
          required
          InputProps={{
            classes: {
              root: classes.input,
              notchedOutline: classes.inputOutline,
            },
            endAdornment: (
              <IconButton onClick={() => setShowPassword((p) => !p)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
          error={user.password.error}
          helperText={user.password.error ? user.password.errorMessage : ''}
          value={user.password.value}
          onChange={(e) =>
            setUser({
              ...user,
              password: {
                value: e.target.value,
                error: false,
                errorMessage: '',
              },
            })
          }
        />
      </Grid>
      <Grid item style={{ marginTop: '1.25em' }}>
        <Grid container justify="space-between">
          <Grid item>
            <label htmlFor="passsword" className={classes.label}>
              {t['Verify New Password']}
            </label>
          </Grid>
        </Grid>

        <TextField
          placeholder="Confirm new Password"
          variant="outlined"
          fullWidth
          size="small"
          type={showPassword ? 'text' : 'password'}
          required
          InputProps={{
            classes: {
              root: classes.input,
              notchedOutline: classes.inputOutline,
            },
            endAdornment: (
              <IconButton onClick={() => setShowPassword((p) => !p)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
          error={user.confirmPassword.error}
          helperText={
            user.confirmPassword.error ? user.confirmPassword.errorMessage : ''
          }
          value={user.confirmPassword.value}
          onChange={(e) =>
            setUser({
              ...user,
              confirmPassword: {
                value: e.target.value,
                error: false,
                errorMessage: '',
              },
            })
          }
        />
      </Grid>
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
          {loading ? <CircularProgress /> : t['Reset']}
        </Button>
      </Grid>
    </Grid>
  );
}
