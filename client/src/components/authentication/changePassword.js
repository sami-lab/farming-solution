import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  useTheme,
  TextField,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';

import { changePassword } from '../../../api/authentication/login';
const useStyles = makeStyles((theme) => ({
  label: {
    ...theme.typography.label,
  },

  input: {
    ...theme.typography.input,
    borderRadius: '3px',
    background: '#fbfbfd',
    boxShadow: 'none',
    marginTop: '3px',
    '&::placeholder': {
      fontFamily: 'Averta',
      fontWeight: 400,
      fontSize: '1.1rem',
    },
  },
  inputOutline: {
    border: '1px solid #899298',
  },
}));
export default function Profile(props) {
  const t = props.languageJson;

  const theme = useTheme();
  const classes = useStyles();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
    severity: '',
  });

  const submitHandler = async () => {
    if (newPassword !== confirmNewPassword) {
      setShowToast({
        active: true,
        message: t['Password and confirm Password doesnot match'],
        severity: 'error',
      });
      return;
    }
    try {
      setLoading({
        active: true,
        action: 'submit',
      });
      const response = await changePassword(props.userToken, {
        passwordCurrent: currentPassword,
        password: newPassword,
        confirmPassword: confirmNewPassword,
      });
      const result = response.data;
      if (result.status === 'success') {
        setShowToast({
          active: true,
          message: t['Password Updated Successfully'],
          severity: 'success',
        });
      } else {
        setShowToast({
          active: true,
          message: t['Failed to Update Password'],
          severity: 'error',
        });
      }
      setLoading({
        active: false,
        action: '',
      });
    } catch (err) {
      console.log(err);
      setLoading({
        active: false,
        action: '',
      });
      setShowToast({
        active: true,
        message: t['Something went wrong'],
        severity: 'error',
      });
    }
  };
  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowToast({
      active: false,
      message: '',
      severity: '',
    });
  };
  return (
    <Grid container direction="column" spacing={2}>
      <Snackbar
        open={showToast.active}
        autoHideDuration={4000}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} severity={showToast.severity}>
          {showToast.message}
        </Alert>
      </Snackbar>
      {/* Current pAsssword */}
      <Grid item md={8} xs={12}>
        <label htmlFor="currentPassword" className={classes.label}>
          {t['Current Password']}
        </label>
        <TextField
          id="currentPassword"
          variant="outlined"
          type="password"
          fullWidth
          size="small"
          InputProps={{
            classes: {
              root: classes.input,
              notchedOutline: classes.inputOutline,
            },
          }}
          required
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </Grid>
      {/* new pAsssword */}
      <Grid item md={8} xs={12}>
        <label htmlFor="newPassword" className={classes.label}>
          {t['New Password']}
        </label>
        <TextField
          id="newPassword"
          variant="outlined"
          fullWidth
          type="password"
          size="small"
          InputProps={{
            classes: {
              root: classes.input,
              notchedOutline: classes.inputOutline,
            },
          }}
          required
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Grid>
      {/* new pAsssword */}
      <Grid item md={8} xs={12}>
        <label htmlFor="confirmPassword" className={classes.label}>
          {t['Verify New Password']}
        </label>
        <TextField
          id="confirmPassword"
          variant="outlined"
          fullWidth
          type="password"
          size="small"
          InputProps={{
            classes: {
              root: classes.input,
              notchedOutline: classes.inputOutline,
            },
          }}
          required
          placeholder="Verify New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </Grid>
      {/* Submit */}
      <Grid item style={{ marginBottom: '2em' }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: theme.palette.common.primary,
          }}
          onClick={submitHandler}
        >
          <label
            className={classes.label}
            style={{ color: theme.palette.common.light, cursor: 'pointer' }}
          >
            {loading.active && loading.action === 'submit' ? (
              <CircularProgress />
            ) : (
              t['Change Password']
            )}
          </label>
        </Button>
      </Grid>
    </Grid>
  );
}
