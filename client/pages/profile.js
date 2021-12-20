import React, { useState } from 'react';

import {
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
  List,
  Collapse,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Header from '../src/resusable/header';
import Footer from '../src/resusable/footer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import UserProfile from '../src/components/authentication/profile';
import ChangePassword from '../src/components/authentication/changePassword';
import CheckAuth from '../src/resusable/checkAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '10em',
    paddingRight: '10em',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '3em',
      paddingRight: '3em',
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '1em',
      paddingRight: '1em',
    },
  },

  label: {
    ...theme.typography.label,
  },
  tab: {
    ...theme.typography.label,
    marginRight: '1.5em',
    '&:hover': {
      border: 0,
      color: theme.palette.common.primary,
    },
  },
  tabRoot: {
    padding: 0,
    minWidth: 0,
    minHeight: 0,
  },
  input: {
    '&::placeholder': {
      fontFamily: 'Averta',
      fontWeight: 400,
      fontSize: '1.1rem',
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listText: {
    ...theme.typography.label,
  },
  nestedListtext: {
    ...theme.typography.caption,
    fontWeight: 300,
    color: '#000',
    cursor: 'pointer',
  },
}));

export default function Profile(props) {
  const t = props.languageJson;

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const [list1, setList1] = useState(true);
  const [pageTab, setPageTab] = useState('profile');
  return (
    <CheckAuth {...props}>
      <Grid container direction="column">
        <Grid item>
          <Header {...props} languageJson={t} />
        </Grid>
        {/* Heading */}
        <Grid
          item
          container
          style={{ marginTop: '1em', marginBottom: '0.3em' }}
          className={classes.root}
          spacing={2}
        >
          <Grid item md={2} xs={12}></Grid>
          <Grid item md={10} xs={12}>
            <Typography variant="h2">{t['Account Settings']}</Typography>
          </Grid>
        </Grid>
        <Grid item className={classes.root}>
          <Grid container spacing={2}>
            <Grid
              item
              md={2}
              xs={12}
              style={{ padding: 0, paddingRight: '0.2em' }}
            >
              <List
                component="nav"
                style={{ paddingTop: 0 }}
                aria-labelledby="nested-list-subheader"
              >
                <ListItem button onClick={() => setList1((l1) => !l1)}>
                  <ListItemText
                    primary={t['Account Setting']}
                    classes={{
                      primary: classes.listText,
                    }}
                  />
                  {list1 ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={list1} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    style={{ backgroundColor: '#f4f8fb', borderRadius: 10 }}
                  >
                    <ListItem
                      className={classes.nested}
                      style={{
                        backgroundColor:
                          pageTab === 'profile' ? '#DFF8F6' : '#f4f8fb',
                      }}
                      disableGutters
                    >
                      <ListItemText
                        primary={
                          <span
                            style={{
                              color: pageTab === 'profile' ? '#088178' : '#000',
                            }}
                          >
                            {' '}
                            {t['Profile Settings']}
                          </span>
                        }
                        classes={{
                          primary: classes.nestedListtext,
                        }}
                        onClick={() => setPageTab('profile')}
                      />
                    </ListItem>
                    <ListItem
                      className={classes.nested}
                      style={{
                        backgroundColor:
                          pageTab === 'changePassword' ? '#DFF8F6' : '#f4f8fb',
                      }}
                      disableGutters
                    >
                      <ListItemText
                        primary={
                          <span
                            style={{
                              color:
                                pageTab === 'changePassword'
                                  ? '#088178'
                                  : '#000',
                            }}
                          >
                            {' '}
                            {t['Change Password']}
                          </span>
                        }
                        classes={{
                          primary: classes.nestedListtext,
                        }}
                        onClick={() => setPageTab('changePassword')}
                      />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </Grid>
            <Grid item md={10} xs={12}>
              <Grid container direction="column">
                <Grid item>
                  <Tabs
                    value={pageTab}
                    onChange={(event, newValue) => setPageTab(newValue)}
                    TabIndicatorProps={{
                      style: {
                        display: 'none',
                      },
                    }}
                    style={{ minHeight: '24px' }}
                  >
                    <Tab
                      disableFocusRipple
                      label={t['Profile Settings']}
                      className={classes.tab}
                      classes={{
                        root: classes.tabRoot,
                      }}
                      value="profile"
                      style={{
                        backgroundColor: 'transparent',
                        color:
                          pageTab == 'profile'
                            ? theme.palette.common.primary
                            : 'inherit',
                        borderBottom:
                          pageTab == 'profile'
                            ? `2px solid ${theme.palette.common.primary}`
                            : 0,
                      }}
                    />
                    <Tab
                      disableFocusRipple
                      classes={{
                        root: classes.tabRoot,
                      }}
                      label={t['Change Password']}
                      className={classes.tab}
                      value="changePassword"
                      style={{
                        backgroundColor: 'transparent',
                        color:
                          pageTab === 'changePassword'
                            ? theme.palette.common.primary
                            : 'inherit',
                        borderBottom:
                          pageTab == 'changePassword'
                            ? `2px solid ${theme.palette.common.primary}`
                            : 0,
                      }}
                    />
                  </Tabs>
                  <Divider />
                </Grid>
                <Grid item style={{ marginTop: '2em' }}>
                  {pageTab === 'profile' && (
                    <UserProfile
                      user={props.user}
                      userToken={props.userToken}
                      languageJson={t}
                    />
                  )}
                  {pageTab === 'changePassword' && (
                    <ChangePassword
                      userToken={props.userToken}
                      languageJson={t}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Footer languageJson={t} />
        </Grid>
      </Grid>
    </CheckAuth>
  );
}
