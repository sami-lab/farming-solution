import React, { useState } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
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

import { updateProfile } from '../../../api/authentication/login';
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

  const [user, setUser] = useState({
    firstName: props.user.firstName ? props.user.firstName : '',
    lastName: props.user.lastName ? props.user.lastName : '',
    image: props.user.image ? props.user.image : '',
    email: props.user.email ? props.user.email : '',
    userName: props.user.userName ? props.user.userName : '',
    website: props.user.website ? props.user.website : '',
    bio: props.user.bio ? props.user.bio : '',
    twitter: props.user.twitter ? props.user.twitter : '',
    pinterest: props.user.pinterest ? props.user.pinterest : '',
    instagram: props.user.instagram ? props.user.instagram : '',
    dribbble: props.user.dribbble ? props.user.dribbble : '',
    behance: props.user.behance ? props.user.behance : '',
    linkedin: props.user.linkedin ? props.user.linkedin : '',
    github: props.user.github ? props.user.github : '',
  });
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
    severity: '',
  });

  const updateImageHandler = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUser({ ...user, image: e.target.files[0].name });
    }
  };
  const removeImageHandler = () => {
    setFile(null);
    setUser({ ...user, image: '' });
  };

  const submitHandler = async () => {
    try {
      setLoading({
        active: true,
        action: 'submit',
      });
      const response = await updateProfile(props.userToken, { ...user, file });
      const result = response.data;
      if (result.status === 'success') {
        setShowToast({
          active: true,
          message: t['Profile Updated Successfully'],
          severity: 'success',
        });
      } else {
        setShowToast({
          active: true,
          message: t['Failed to Create Product'],
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
    <Grid container direction="column">
      <Snackbar
        open={showToast.active}
        autoHideDuration={4000}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} severity={showToast.severity}>
          {showToast.message}
        </Alert>
      </Snackbar>
      <Grid item container spacing={3} justify="space-between">
        {/* userData */}
        <Grid item md={7} xs={12}>
          <Grid container direction="column" spacing={2}>
            {/* typography */}
            <Grid item>
              <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
                {t['My Profile']}
              </Typography>
            </Grid>
            {/* Profile */}
            <Grid item>
              <label htmlFor="username" className={classes.label}>
                {t['Avatar*']}
              </label>

              <Grid
                container
                spacing={2}
                alignItems="center"
                style={{ marginTop: '3px' }}
              >
                <Grid item>
                  <img
                    src={
                      file !== null
                        ? URL.createObjectURL(file)
                        : user.image
                        ? `${publicRuntimeConfig.backend}/files/${user.image}`
                        : '/dev/empty.jpg'
                    }
                    style={{ width: '75px', height: '75px' }}
                  />
                </Grid>
                <Grid item>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    type="file"
                    onChange={updateImageHandler}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      component="span"
                      size="small"
                      style={{
                        backgroundColor: theme.palette.common.primary,
                        color: theme.palette.common.light,
                      }}
                    >
                      {t['Update']}
                    </Button>
                  </label>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{
                      backgroundColor: 'transparent',
                      color: theme.palette.common.primary,
                      borderColor: theme.palette.common.primary,
                      marginLeft: '0.5em',
                    }}
                    onClick={removeImageHandler}
                  >
                    {t['Delete']}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* Name */}
            <Grid item>
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
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        firstName: e.target.value,
                      })
                    }
                  />
                </Grid>
                {/* Lastname */}
                <Grid item xs={6}>
                  <label htmlFor="lastname" className={classes.label}>
                    {t['Last Name*']}
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
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        lastName: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* Email */}
            <Grid item>
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
                value={user.email}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
              />
            </Grid>
            {/* username */}
            <Grid item>
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
                value={user.userName}
                onChange={(e) =>
                  setUser({
                    ...user,
                    userName: e.target.value,
                  })
                }
              />
            </Grid>
            {/* Website url */}
            <Grid item>
              <label htmlFor="username" className={classes.label}>
                {t['Website URL']}
              </label>

              <TextField
                id="Website URL"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                value={user.website}
                onChange={(e) =>
                  setUser({
                    ...user,
                    website: e.target.value,
                  })
                }
              />
            </Grid>
            {/* bui */}
            <Grid item>
              <label htmlFor="username" className={classes.label}>
                {t['Bio']}
              </label>
              <textarea
                className={classes.input}
                style={{ width: '100%' }}
                rows={3}
                value={user.bio}
                onChange={(e) =>
                  setUser({
                    ...user,
                    bio: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>
        {/* social profiles */}
        <Grid item md={4} xs={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
                {t['Social Profiles (Optional)']}
              </Typography>
            </Grid>
            {/* Twiiter */}
            <Grid item>
              <label htmlFor="Twitter" className={classes.label}>
                {t['Twitter']}
              </label>
              <TextField
                id="Twitter"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                value={user.twitter}
                onChange={(e) =>
                  setUser({
                    ...user,
                    twitter: e.target.value,
                  })
                }
              />
            </Grid>{' '}
            {/* Pinterest */}
            <Grid item>
              <label htmlFor="Pinterest" className={classes.label}>
                {t['Pinterest']}
              </label>
              <TextField
                id="Pinterest"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                value={user.twitter}
                onChange={(e) =>
                  setUser({
                    ...user,
                    twitter: e.target.value,
                  })
                }
              />
            </Grid>
            {/* Instagram */}
            <Grid item>
              <label htmlFor="Instagram" className={classes.label}>
                {t['Instagram']}
              </label>
              <TextField
                id="Instagram"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                value={user.instagram}
                onChange={(e) =>
                  setUser({
                    ...user,
                    instagram: e.target.value,
                  })
                }
              />
            </Grid>
            {/* Dribbble */}
            <Grid item>
              <label htmlFor="Dribbble" className={classes.label}>
                {t['Dribbble']}
              </label>
              <TextField
                id="Dribbble"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                value={user.dribbble}
                onChange={(e) =>
                  setUser({
                    ...user,
                    dribbble: e.target.value,
                  })
                }
              />
            </Grid>
            {/* behance */}
            <Grid item>
              <label htmlFor="behance" className={classes.label}>
                {t['Behance']}
              </label>
              <TextField
                id="behance"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                value={user.behance}
                onChange={(e) =>
                  setUser({
                    ...user,
                    behance: e.target.value,
                  })
                }
              />
            </Grid>
            {/* LinkedIn */}
            <Grid item>
              <label htmlFor="LinkedIn" className={classes.label}>
                {t['LinkedIn']}
              </label>
              <TextField
                id="LinkedIn"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                value={user.linkedin}
                onChange={(e) =>
                  setUser({
                    ...user,
                    linkedin: e.target.value,
                  })
                }
              />
            </Grid>
            {/* Github */}
            <Grid item>
              <label htmlFor="Github" className={classes.label}>
                {t['Github']}
              </label>
              <TextField
                id="Github"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                value={user.github}
                onChange={(e) =>
                  setUser({
                    ...user,
                    github: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Submit */}
      <Grid item style={{ marginTop: '2em', marginBottom: '2em' }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: theme.palette.common.primary,
          }}
          onClick={submitHandler}
          disabled={loading.active && loading.action === 'submit'}
        >
          <label
            className={classes.label}
            style={{ color: theme.palette.common.light, cursor: 'pointer' }}
          >
            {loading.active && loading.action === 'submit' ? (
              <CircularProgress />
            ) : (
              t['Update Settings']
            )}
          </label>
        </Button>
      </Grid>
    </Grid>
  );
}
