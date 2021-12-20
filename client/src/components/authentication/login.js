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

import { login } from '../../../api/authentication/login';
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
export default function Login(props) {
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
      const response = await login(user.userName.value, user.password.value);
      const result = await response.json();
      if (result.status === 'success') {
        localStorage.setItem('userToken', result.token);
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
      <Grid item style={{ marginTop: '1.25em' }}>
        <Grid container justify="space-between">
          <Grid item>
            <label htmlFor="passsword" className={classes.label}>
              {t['Password*']}
            </label>
          </Grid>
          <Grid item>
            <label
              className={[classes.label, classes.forgetPassword].join(' ')}
            >
              {t['Forget Password?']}
            </label>
          </Grid>
        </Grid>

        <TextField
          id="passsword"
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
          {loading ? <CircularProgress /> : t['Log In']}
        </Button>
      </Grid>
    </Grid>
  );
}
