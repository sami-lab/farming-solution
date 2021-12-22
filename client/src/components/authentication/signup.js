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
import { makeStyles, useTheme } from '@material-ui/core/styles';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { signUp } from '../../../api/authentication/login';

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
export default function Signup(props) {
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
    firstName: {
      value: '',
      error: false,
      errorMessage: '',
    },
    lastName: {
      value: '',
      error: false,
      errorMessage: '',
    },
    email: {
      value: '',
      error: false,
      errorMessage: '',
    },
    userName: {
      value: '',
      error: false,
      errorMessage: '',
    },
    password: {
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
    if (user.firstName.value == '') {
      setUser({
        ...user,
        userName: {
          value: user.firstName.value,
          error: true,
          errorMessage: t['First Name cannot be empty'],
        },
      });
      return;
    }

    if (user.email.value == '') {
      setUser({
        ...user,
        userName: {
          value: user.email.value,
          error: true,
          errorMessage: t['Email cannot be empty'],
        },
      });
      return;
    }
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
    if (user.password.value == '') {
      setUser({
        ...user,
        userName: {
          value: user.password.value,
          error: true,
          errorMessage: t['Password cannot be empty'],
        },
      });
      return;
    }
    try {
      setLoading(true);
      const response = await signUp(
        user.firstName.value,
        user.lastName.value,
        user.email.value,
        user.userName.value,
        user.password.value
      );
      const result = await response.json();
      if (result.status === 'success') {
        console.log(result.data.user, result.token);
        localStorage.setItem('farmingToken', result.token);
        props.setUser(result.data.user);
        props.setUserToken(result.token);
        router.push('/');
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
      {/* Name */}
      <Grid item style={{ marginTop: '1em' }}>
        <Grid container spacing={2}>
          {/* FirstName */}
          <Grid item xs={6}>
            <label htmlFor="firstname" className={classes.label}>
              {t['First Name*']}
            </label>
            <TextField
              id="firstname"
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
              error={user.firstName.error}
              helperText={
                user.firstName.error ? user.firstName.errorMessage : ''
              }
              value={user.firstName.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  firstName: {
                    value: e.target.value,
                    error: false,
                    errorMessage: '',
                  },
                })
              }
            />
          </Grid>
          {/* Lastname */}
          <Grid item xs={6}>
            <label htmlFor="lastname" className={classes.label}>
              {t['Last Name']}
            </label>
            <TextField
              id="lastname"
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
              error={user.lastName.error}
              helperText={user.lastName.error ? user.lastName.errorMessage : ''}
              value={user.lastName.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  lastName: {
                    value: e.target.value,
                    error: false,
                    errorMessage: '',
                  },
                })
              }
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Email */}
      <Grid item style={{ marginTop: '1.25em' }}>
        <label htmlFor="email" className={classes.label}>
          {t['Email*']}
        </label>
        <TextField
          id="email"
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
          error={user.email.error}
          helperText={user.email.error ? user.email.errorMessage : ''}
          value={user.email.value}
          onChange={(e) =>
            setUser({
              ...user,
              email: {
                value: e.target.value,
                error: false,
                errorMessage: '',
              },
            })
          }
        />
      </Grid>
      {/* username */}
      <Grid item style={{ marginTop: '1.25em' }}>
        <label htmlFor="username" className={classes.label}>
          {t['Username*']}
        </label>

        <TextField
          id="username"
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
      {/* Password */}
      <Grid item style={{ marginTop: '1.25em' }}>
        <label htmlFor="password" className={classes.label}>
          {t['Password*']}
        </label>

        <TextField
          id="password"
          variant="outlined"
          fullWidth
          size="small"
          placeholder="8+ characters"
          type={showPassword ? 'text' : 'password'}
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
          required
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
          {loading ? <CircularProgress /> : t['Create Account']}
        </Button>
      </Grid>
    </Grid>
  );
}
