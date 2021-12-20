import React from 'react';
import {
  Button,
  useMediaQuery,
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import PinterestIcon from '@material-ui/icons/Pinterest';
import FacebookIcon from '@material-ui/icons/Facebook';
import Instagram from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Link from '../resusable/Link';
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '5em',
    paddingLeft: '4em',
    paddingRight: '4em',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '2em',
      paddingLeft: '1em',
      paddingRight: '1em',
    },
  },
  link: {
    ...theme.typography.subtitle2,
    textTransform: 'normal',
    textDecoration: 'none',
    lineHeight: 1.4,
    transition: 'color .25s',
    fontWeight: 200,

    '&:hover': {
      color: theme.palette.common.primary,
      textDecoration: 'none',
    },
  },
  logo: {
    textTransform: 'none',
    width: '110px',
    height: '43px',
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      height: '40px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100px',
      height: '40px',
      marginLeft: '0.3em',
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listText: {
    ...theme.typography.label,
  },
  nestedListtext: {
    ...theme.typography.subtitle2,
  },
}));
export default function Footer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [list1, setList1] = React.useState(false);
  const [list2, setList2] = React.useState(false);
  const [list3, setList3] = React.useState(false);
  const [list4, setList4] = React.useState(false);
  const [list5, setList5] = React.useState(false);

  const desktop = (
    <Grid container justify="space-between">
      <Grid item sm>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={2}
          style={{ margin: 0 }}
        >
          <Grid
            item
            style={{
              fontWeight: 700,
            }}
            className={classes.link}
          >
            Earn
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Become an Affliate
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Open a Shop
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={2}
          style={{ margin: 0 }}
        >
          <Grid
            item
            style={{
              fontWeight: 700,
            }}
            className={classes.link}
          >
            Recources
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Blog
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Collections
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Community
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Help Center
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Licences
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={2}
          style={{ margin: 0 }}
        >
          <Grid
            item
            style={{
              fontWeight: 700,
            }}
            className={classes.link}
          >
            The Goods
          </Grid>

          <Grid item component={Link} href="/" className={classes.link}>
            Branding eBook
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Free Goods
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Gift Cards
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Purchase Credits
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={2}
          style={{ margin: 0 }}
        >
          <Grid
            item
            style={{
              fontWeight: 700,
            }}
            className={classes.link}
          >
            About
          </Grid>

          <Grid item component={Link} href="/" className={classes.link}>
            Brand
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Careers
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm>
        <Grid container direction="column" spacing={2} style={{ margin: 0 }}>
          <Grid
            item
            style={{
              fontWeight: 700,
            }}
            className={classes.link}
          >
            Dribble
          </Grid>

          <Grid item component={Link} href="/" className={classes.link}>
            Designer Inspiration
          </Grid>
          <Grid item component={Link} href="/" className={classes.link}>
            Hire a Designer
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const mobile = (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem button onClick={() => setList1((l1) => !l1)}>
        <ListItemText
          primary="Earn"
          classes={{
            primary: classes.listText,
          }}
        />
        {list1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={list1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem component={Link} href="#" className={classes.nested}>
            <ListItemText
              primary="Become Affiliate"
              classes={{
                primary: classes.nestedListtext,
              }}
            />
          </ListItem>
          <ListItem component={Link} href="#" className={classes.nested}>
            <ListItemText
              primary="Open a Shop"
              classes={{
                primary: classes.nestedListtext,
              }}
            />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={() => setList2((l2) => !l2)}>
        <ListItemText
          primary="Resources"
          classes={{
            primary: classes.listText,
          }}
        />
        {list2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={list2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem component={Link} href="#" className={classes.nested}>
            <ListItemText
              primary="Blog"
              classes={{
                primary: classes.nestedListtext,
              }}
            />
          </ListItem>
          <ListItem component={Link} href="#" className={classes.nested}>
            <ListItemText
              primary="Collection"
              classes={{
                primary: classes.nestedListtext,
              }}
            />
          </ListItem>
          <ListItem component={Link} href="#" className={classes.nested}>
            <ListItemText
              primary="Community"
              classes={{
                primary: classes.nestedListtext,
              }}
            />
          </ListItem>
          <ListItem component={Link} href="#" className={classes.nested}>
            <ListItemText
              primary="Help Center"
              classes={{
                primary: classes.nestedListtext,
              }}
            />
          </ListItem>
          <ListItem component={Link} href="#" className={classes.nested}>
            <ListItemText
              primary="Licences"
              classes={{
                primary: classes.nestedListtext,
              }}
            />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={() => setList3((l3) => !l3)}>
        <ListItemText
          primary="The Goods"
          classes={{
            primary: classes.listText,
          }}
        />
        {list3 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={list3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem component={Link} href="#" className={classes.nested}>
            <ListItemText
              primary="branding eBook"
              classes={{
                primary: classes.nestedListtext,
              }}
            />
          </ListItem>
          <ListItem component={Link} href="#" className={classes.nested}>
            <ListItemText
              primary="Free Goods"
              classes={{
                primary: classes.nestedListtext,
              }}
            />
          </ListItem>
          <ListItem component={Link} href="#" className={classes.nested}>
            <ListItemText
              primary="Gift Cards"
              classes={{
                primary: classes.nestedListtext,
              }}
            />
          </ListItem>
          <ListItem component={Link} href="#" className={classes.nested}>
            <ListItemText
              primary="Purchase Credit"
              classes={{
                primary: classes.nestedListtext,
              }}
            />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
  return (
    <div
      style={{
        backgroundColor: '#F4F8FB',
        marginBottom: 0,
      }}
    >
      <Grid container direction="column" className={classes.root}>
        <Grid item>
          <Grid
            container
            direction={matchesSM ? 'column' : 'row'}
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Button
                component={Link}
                style={{
                  textDecoration: 'none',
                  backgroundColor: 'transparent',
                }}
                href="/"
                disableRipple
              >
                <img src="/dev/logo.svg" className={classes.logo} alt="logo" />
              </Button>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" justify="center" spacing={2}>
                <Grid
                  item
                  component={'a'}
                  href="#"
                  style={{ textDecoration: 'none' }}
                >
                  <SportsBaseballIcon
                    style={{ width: '1.5em', height: '1.5em', fill: '#303538' }}
                  />
                </Grid>
                <Grid
                  item
                  component={'a'}
                  href="#"
                  style={{ textDecoration: 'none' }}
                >
                  <PinterestIcon
                    style={{ width: '1.5em', height: '1.5em', fill: '#303538' }}
                  />
                </Grid>
                <Grid
                  item
                  component={'a'}
                  href="#"
                  style={{ textDecoration: 'none' }}
                >
                  <FacebookIcon
                    style={{ width: '1.5em', height: '1.5em', fill: '#303538' }}
                  />
                </Grid>
                <Grid
                  item
                  component={'a'}
                  href="#"
                  style={{ textDecoration: 'none' }}
                >
                  <Instagram
                    style={{ width: '1.5em', height: '1.5em', fill: '#303538' }}
                  />
                </Grid>

                <Grid
                  item
                  component={'a'}
                  href="#"
                  style={{ textDecoration: 'none' }}
                >
                  <TwitterIcon
                    style={{ width: '1.5em', height: '1.5em', fill: '#303538' }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: '2em' }} />
        </Grid>

        <Grid
          item
          style={{
            marginTop: '1em',
            paddingBottom: '1em',
          }}
        >
          {matchesSM ? mobile : desktop}
        </Grid>
        <Grid
          item
          style={{
            marginTop: '1em',
            paddingBottom: '1em',
          }}
        >
          <Grid
            container
            direction={matchesSM ? 'column' : 'row'}
            justify="space-between"
          >
            <Grid item md={6}>
              <Grid
                container
                direction={matchesSM ? 'column' : 'row'}
                spacing={2}
              >
                <Grid item component={Link} href="/" className={classes.link}>
                  Terms & Conditions
                </Grid>
                <Grid item component={Link} href="/" className={classes.link}>
                  Privacy Policy
                </Grid>
                <Grid item component={Link} href="/" className={classes.link}>
                  CA Privacy Policy
                </Grid>
                <Grid item component={Link} href="/" className={classes.link}>
                  Cookie Policy
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} style={{ marginTop: matchesSM ? '1em' : 0 }}>
              <Typography variant="h3" paragraph style={{ color: '#899298' }}>
                © 2021 Creative Market, a Dribbble company. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
