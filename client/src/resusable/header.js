import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  MenuItem,
  InputBase,
  Menu,
  useTheme,
  Grid,
  TextField,
  useMediaQuery,
  Hidden,
  List,
  ListItemText,
  ListItem,
  Drawer,
  Divider,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircle from "@material-ui/icons/AccountCircle";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10em",
    paddingRight: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "3em",
      paddingRight: "3em",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1em",
      paddingRight: "1em",
    },
  },
  grow: {
    flexGrow: 1,
  },
  inputRoot: {
    fontFamily: "Averta",
    fontSize: "1.1rem",
    fontWeight: 500,
    "&::placeholder": {
      fontFamily: "Averta",
      fontStyle: "italic",
      fontWeight: 300,
      fontSize: "1rem",
      opacity: 0.7,
    },
  },
  label: {
    ...theme.typography.label,
  },
  select: {
    ...theme.typography.label,
    "& .MuiSelect-select:focus": {
      backgroundColor: "white",
    },
  },
  desktopItemPadding: {
    padding: "10px 16px 0px 16px",
  },
  desktopItem: {
    boxSizing: "border-box",
    ...theme.typography.subtitle2,
    color: theme.palette.common.darkBlack,
    fontWeight: 700,
    paddingBottom: "8px",
    cursor: "pointer",
    borderBottom: `4px solid ${theme.palette.common.light}`,
    "&:hover": {
      color: theme.palette.common.primary,
      borderBottom: `4px solid ${theme.palette.common.primary}`,
    },
  },
  listText: {
    ...theme.typography.subtitle2,
    fontWeight: "700",
  },
  nestedListtext: {
    ...theme.typography.label,
  },
}));

export default function PrimarySearchAppBar(props) {
  const t = props.languageJson;
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  //const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const router = useRouter();
  const [profileMenu, setProfileMenu] = React.useState(null);
  const [drawerOpen, setDrawer] = useState(false);
  const [headerList, setHeaderList] = useState(
    props.categories.map((x) => {
      return {
        ...x,
        popup: false,
      };
    })
  );
  useEffect(() => {
    setHeaderList(
      props.categories.map((x) => {
        return {
          ...x,
          popup: false,
        };
      })
    );
  }, [props.categories]);
  const [search, setSearch] = React.useState("");
  const [searchOption, setSearchOption] = React.useState("allProducts");
  const searchOptions = [
    {
      label: "All Products",
      value: "allProducts",
    },
    {
      label: "Photos",
      value: "photos",
    },
    {
      label: "Graphics",
      value: "graphics",
    },
  ];
  const logoutHandler = async () => {
    try {
      router.push("/login");
      await localStorage.removeItem("farmingToken");
      props.setUserToken(null);
      props.setUser(null);
      setProfileMenu(null);
    } catch (e) {
      console.log("faled to logout", e);
    }
  };

  const menuID = "profile-menu";
  const renderMenu = (
    <Menu
      anchorEl={profileMenu}
      id={menuID}
      keepMounted
      open={Boolean(profileMenu)}
      onClose={() => setProfileMenu(null)}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MenuItem onClick={() => setProfileMenu(null)}>
        {" "}
        <Link href="/profile">
          <a style={{ textDecoration: "none" }} className={classes.label}>
            {t["Profile"]}
          </a>
        </Link>{" "}
      </MenuItem>
      <MenuItem onClick={() => setProfileMenu(null)}>
        {" "}
        <Link href="/purchase">
          <a style={{ textDecoration: "none" }} className={classes.label}>
            {t["Purchase"]}
          </a>
        </Link>{" "}
      </MenuItem>
      {props.user && props.user?.roles.every((x) => x.name !== "Manager") && (
        <MenuItem onClick={() => setProfileMenu(null)}>
          {" "}
          <Link href="/partner">
            <a style={{ textDecoration: "none" }} className={classes.label}>
              {t["Open a Shop"]}
            </a>
          </Link>{" "}
        </MenuItem>
      )}
      {props.user && props.user.roles?.some((x) => x.name === "Manager") && (
        <>
          <MenuItem onClick={() => setProfileMenu(null)}>
            {" "}
            <Link href="/shop/myShop">
              <a style={{ textDecoration: "none" }} className={classes.label}>
                {t["My Shop"]}
              </a>
            </Link>{" "}
          </MenuItem>
          <MenuItem onClick={() => setProfileMenu(null)}>
            {" "}
            <Link href="/createProduct">
              <a style={{ textDecoration: "none" }} className={classes.label}>
                {t["Add Products"]}
              </a>
            </Link>{" "}
          </MenuItem>
        </>
      )}
      <MenuItem onClick={() => setProfileMenu(null)}>
        {" "}
        <Link href="/prediction">
          <a style={{ textDecoration: "none" }} className={classes.label}>
            Insights
          </a>
        </Link>{" "}
      </MenuItem>
      <MenuItem onClick={() => setProfileMenu(null)}>
        {" "}
        <Link href="/chat">
          <a style={{ textDecoration: "none" }} className={classes.label}>
            Chat with Bot
          </a>
        </Link>{" "}
      </MenuItem>
      <Divider />
      <MenuItem onClick={logoutHandler}>
        {" "}
        <p className={classes.label} style={{ margin: 0 }}>
          {t["Logout"]}
        </p>{" "}
      </MenuItem>
    </Menu>
  );

  const mobileList = (
    <Grid
      container
      direction="column"
      style={{ padding: "32px 24px", width: "100vw" }}
    >
      <Grid item>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.listText}>
              {t["Product Categories"]}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setDrawer(false)}>
              <CloseIcon style={{ fontWeight: "700" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <List component="nav" aria-labelledby="nested-list-subheader">
          {headerList.map((ele) => (
            <Link href={`/category/${ele.name}`}>
              <ListItem
                button
                style={{ padding: "8px 15px" }}
                key={ele.name}
                // onClick={() =>
                //   setHeaderList((l1) =>
                //     l1.map((list) => {
                //       if (list.name === ele.name) list.popup = !list.popup;
                //       return list;
                //     })
                //   )
                // }
                onClick={() => setDrawer(false)}
              >
                <ListItemText
                  primary={ele.name}
                  classes={{
                    primary: classes.listText,
                  }}
                />
                {/* {list1 ? <ExpandLess /> : <ExpandMore />} */}
              </ListItem>
            </Link>
          ))}
        </List>
      </Grid>
    </Grid>
  );
  const mobileDrawer = <Drawer open={drawerOpen}>{mobileList}</Drawer>;
  const searchInput = (
    <Grid
      item
      className={classes.grow}
      md={9}
      style={{ borderBottom: "3px solid #000" }}
    >
      <Grid container spacing={2}>
        <Hidden xsDown>
          <Grid item>
            <TextField
              id="standard-select-currency"
              select
              className={classes.select}
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
              SelectProps={{
                IconComponent: (props) => (
                  <div style={{ marginRight: "0.5em" }}>
                    {" "}
                    <KeyboardArrowDownIcon {...props} />
                  </div>
                ),
                MenuProps: {
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                },
              }}
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.inputRoot,
                },
              }}
            >
              {searchOptions.map((x) => (
                <MenuItem
                  key={x.value}
                  value={x.value}
                  className={classes.label}
                >
                  {x.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Hidden>
        <Grid item style={{ flex: 1 }}>
          <TextField
            fullWidth
            size="small"
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.inputRoot,
              },
              startAdornment: <SearchIcon style={{ marginRight: "0.3em" }} />,
            }}
            style={{ border: 0 }}
            placeholder={t["Search for watercolor, script fonts, procreate"]}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
  const desktopList = (
    <Grid container justifyContent="center">
      {headerList.map((ele, ind) => (
        <Grid
          key={ele.name}
          item
          className={classes.desktopItemPadding}
          style={{ paddingLeft: ind === 0 ? 0 : "16px" }}
        >
          <Link href={`/category/${ele.name}`}>
            <Typography className={classes.desktopItem}>{ele.name}</Typography>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
  const logoContainer = (
    <Grid container alignItems="center">
      {matchesSM && (
        <Grid item>
          <IconButton
            disableTouchRipple={true}
            style={{ paddingLeft: 0, backgroundColor: "transparent" }}
            onClick={() => setDrawer(true)}
          >
            <MenuIcon
              style={{
                fill: theme.palette.common.darkBlack,
                fontSize: "1.7rem",
              }}
            />
          </IconButton>
        </Grid>
      )}
      <Grid item component={Link} href="/" style={{ cursor: "pointer" }}>
        <Typography variant="h6" noWrap>
          <img
            src="/dev/logo.jpeg"
            style={{
              width: matchesSM ? "65px" : "200px",
              height: matchesSM ? "26px" : "50px",
            }}
            alt="logo"
          />
        </Typography>
      </Grid>
    </Grid>
  );
  return (
    <div className={classes.grow} style={{ borderTop: `4px solid #39B4AC` }}>
      {matchesSM && mobileDrawer}
      <AppBar
        elevation={0}
        position="static"
        style={{
          paddingTop: "1em",
          paddingBottom: matchesSM ? "1em" : 0,
          backgroundColor: theme.palette.common.light,
          borderBottom: "1px solid rgb(0 0 0 / 12%)",
        }}
        className={classes.root}
      >
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          justifyContent="space-between"
        >
          {!matchesSM && (
            <Grid item xs={2}>
              {logoContainer}
            </Grid>
          )}
          <Grid item md={10} xs={12}>
            <Grid container alignItems="center" justify="space-between">
              {matchesSM && (
                <Grid item xs={5}>
                  {logoContainer}
                </Grid>
              )}
              {/* {!matchesSM && searchInput} */}
              {!matchesSM && (
                <Grid item xs={9}>
                  {desktopList}
                </Grid>
              )}
              <Grid item md={3} xs={7}>
                <Grid
                  container
                  spacing={props.userToken !== null ? 2 : 1}
                  alignItems="center"
                  justify="flex-end"
                >
                  {props.userToken !== null &&
                    props.user &&
                    props.user?.roles.some((x) => x.name === "Manager") && (
                      <>
                        <Grid
                          item
                          style={{
                            alignSelf: "flex-end",
                            marginTop: "0.3em",
                          }}
                        >
                          <Link href="/dashboard">
                            <a>
                              <StorefrontIcon
                                style={{
                                  color: theme.palette.common.primary,
                                  fontSize: "2rem",
                                }}
                              />
                            </a>
                          </Link>
                        </Grid>

                        <Typography variant="h2">|</Typography>
                      </>
                    )}

                  {props.userToken !== null &&
                    props.user &&
                    props.user?.roles.some((x) => x.name === "Admin") && (
                      <>
                        <Grid
                          item
                          style={{
                            alignSelf: "flex-end",
                            marginTop: "0.3em",
                          }}
                        >
                          <Link href="/adminDashboard">
                            <a>
                              <StorefrontIcon
                                style={{
                                  color: theme.palette.common.primary,
                                  fontSize: "2rem",
                                }}
                              />
                            </a>
                          </Link>
                        </Grid>

                        <Typography variant="h2">|</Typography>
                      </>
                    )}
                  <Grid item>
                    {props.userToken !== null ? (
                      <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuID}
                        aria-haspopup="true"
                        onClick={(e) => setProfileMenu(e.currentTarget)}
                        color="inherit"
                        style={{
                          padding: "0px 5px",
                          backgroundColor: "transparent",
                        }}
                      >
                        {props.user?.photo ? (
                          <Avatar
                            alt={props.user?.name}
                            src={props.user?.photo}
                          />
                        ) : (
                          <AccountCircle
                            style={{
                              color: theme.palette.common.primary,
                              fontSize: "2rem",
                            }}
                          />
                        )}
                      </IconButton>
                    ) : (
                      <Typography
                        variant="subtitle2"
                        style={{
                          color: theme.palette.common.primary,
                          fontWeight: 700,
                        }}
                      >
                        <>
                          <Link href="/login">
                            <a
                              style={{
                                textDecoration: "none",
                                color: theme.palette.common.primary,
                              }}
                            >
                              {t["Log In"]}
                            </a>
                          </Link>
                          <span
                            style={{
                              marginLeft: "0.7em",
                              marginRight: "0.7em",
                            }}
                          >
                            /
                          </span>
                          <Link href="/signup">
                            <a
                              style={{
                                textDecoration: "none",
                                color: theme.palette.common.primary,
                              }}
                            >
                              {t["Sign Up"]}
                            </a>
                          </Link>
                        </>
                      </Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Typography variant="h2">|</Typography>
                  </Grid>
                  <Grid
                    item
                    style={{
                      alignSelf: "flex-end",
                      marginTop: "0.3em",
                    }}
                  >
                    <Link href="/cart">
                      <a style={{ textDecoration: "none" }}>
                        <img
                          src="/dev/cart.svg"
                          style={{ width: "2em", height: "2em" }}
                        />
                      </a>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid container>{matchesSM && searchInput}</Grid>
            <Grid container>{!matchesSM && desktopList}</Grid> */}
          </Grid>
        </Grid>
      </AppBar>
      {renderMenu}
    </div>
  );
}
