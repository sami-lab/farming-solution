import React, { useState } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
const { publicRuntimeConfig } = getConfig();

import Link from 'next/link';
import {
  Button,
  Grid,
  Typography,
  useTheme,
  TextField,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
  alert: {
    padding: '4px 16px',
  },
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

export default function Cart(props) {
  const t = props.languageJson;
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const [cartItems, setCartItems] = useState(props.cartItems);

  const redirectToCheckout = () => {
    const query = cartItems.map((item) => {
      return {
        id: item.product._id,
        license: item.license,
        quantity: item.quantity,
        image: item.product.images[0],
        title: item.product.title,
        shopId: item.product.shopId.id,
        shopName: item.product.shopId.shopName,
        price: item.product[item.license],
      };
    });
    router.push({
      pathname: '/checkout',
      query: {
        data: JSON.stringify(query),
      },
    });
  };
  return (
    <Grid container direction="column">
      {/* heading Your Cart*/}
      <Grid
        item
        container
        style={{ marginTop: '2em' }}
        className={classes.root}
        alignItems="center"
      >
        <Grid item>
          <Typography variant="subtitle1">{t['Your Cart']}</Typography>
        </Grid>
        <Grid item style={{ marginLeft: '1em' }}>
          <Typography
            variant="h3"
            style={{ textTransform: 'none', marginTop: '0.1em' }}
          >
            <Link href="/purchase">
              <a
                style={{
                  textDecoration: 'none',
                  color: theme.palette.common.primary,
                }}
              >
                {' '}
                {t['View Past Purchases']}
              </a>
            </Link>
          </Typography>
        </Grid>
      </Grid>
      {/* cart Items */}
      <Grid
        item
        container
        style={{ marginTop: '1em' }}
        className={classes.root}
        justify="space-between"
      >
        <Grid item md={8} style={{ paddingRight: '1em' }}>
          <Grid
            container
            direction="column"
            style={{ borderTop: '1px solid #d5d5d8' }}
          >
            {props.cartItems.length > 0 &&
              cartItems.map((item, ind) => (
                <Grid
                  item
                  style={{
                    borderBottom: '1px solid #d5d5d8',
                    padding: '24px 0',
                  }}
                  key={ind}
                >
                  <Grid container alignItems="center">
                    {/* for image */}
                    <Grid item>
                      <img
                        src={
                          publicRuntimeConfig.backend +
                          '/files/' +
                          item.product.images[0]
                        }
                        style={{
                          width: '145px',
                          height: '96px',
                          marginRight: '0.4em',
                        }}
                      />
                    </Grid>
                    {/* For quantity */}
                    <Grid
                      item
                      container
                      direction="column"
                      style={{
                        flex: 1,
                        marginLeft: '0.5em',
                        alignSelf: 'flex-start',
                      }}
                    >
                      {/* for title */}
                      <Grid item>
                        <Typography variant="subtitle2">
                          {item.product.title} by{' '}
                          <span style={{ color: theme.palette.common.primary }}>
                            {' '}
                            {item.product.shopId.shopName}
                          </span>
                        </Typography>
                      </Grid>
                      {/* for price and quantity */}
                      <Grid item style={{ marginTop: '0.3em' }}>
                        <Grid container spacing={2}>
                          {' '}
                          {/* slect */}
                          <Grid item>
                            <label htmlFor="email" className={classes.label}>
                              {t['License Type']}
                            </label>
                            <TextField
                              select
                              id="License"
                              variant="outlined"
                              fullWidth
                              size="small"
                              InputProps={{
                                classes: {
                                  root: classes.input,
                                  notchedOutline: classes.inputOutline,
                                },
                              }}
                              SelectProps={{
                                MenuProps: {
                                  anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                  },
                                  getContentAnchorEl: null,
                                },
                              }}
                              required
                              value={item.license}
                              onChange={(e) =>
                                setCartItems(
                                  cartItems.map((x) => {
                                    if (x.id == item.id) {
                                      item.license = e.target.value;
                                    }
                                    return x;
                                  })
                                )
                              }
                            >
                              <MenuItem value="personalLicence">
                                <Grid container justify="space-between">
                                  <Typography className={classes.label}>
                                    {' '}
                                    {t['Personal Licence']}{' '}
                                  </Typography>
                                  <Typography className={classes.label}>
                                    {' '}
                                    ${item.product.personalLicence}{' '}
                                  </Typography>
                                </Grid>
                              </MenuItem>
                              <MenuItem value="commercialLicence">
                                <Grid container justify="space-between">
                                  <Typography className={classes.label}>
                                    {' '}
                                    {t['Commercial Licence']}{' '}
                                  </Typography>
                                  <Typography className={classes.label}>
                                    {' '}
                                    ${item.product.commercialLicence}{' '}
                                  </Typography>
                                </Grid>
                              </MenuItem>
                              <MenuItem value="extendedCommercialLicence">
                                <Grid container justify="space-between">
                                  <Typography className={classes.label}>
                                    {t['Extended Commercial Licence']}{' '}
                                  </Typography>
                                  <Typography className={classes.label}>
                                    {' '}
                                    ${
                                      item.product.extendedCommercialLicence
                                    }{' '}
                                  </Typography>
                                </Grid>
                              </MenuItem>
                            </TextField>
                          </Grid>{' '}
                          {/* quantity */}
                          <Grid item style={{ alignSelf: 'flex-end' }}>
                            <Grid container alignItems="center">
                              <IconButton
                                disableTouchRipple={true}
                                style={{
                                  padding: 0,
                                  backgroundColor: 'transparent',
                                  opacity: item.quantity === 1 ? 0.3 : 1,
                                }}
                                disabled={item.quantity === 1}
                                onClick={() => {
                                  setCartItems(() => {
                                    return cartItems.map((x) => {
                                      if (x._id == item._id) {
                                        x.quantity = x.quantity - 1;
                                      }
                                      return x;
                                    });
                                  });
                                }}
                              >
                                <RemoveIcon
                                  style={{
                                    fill: theme.palette.common.primary,
                                    fontSize: '1.7rem',
                                  }}
                                />
                              </IconButton>
                              <Typography
                                className={classes.label}
                                style={{
                                  marginLeft: '0.5em',
                                  marginRight: '0.5em',
                                }}
                              >
                                {' '}
                                {item.quantity} seat
                                {item.quantity === 1 ? '' : 's'}
                              </Typography>
                              <IconButton
                                disableTouchRipple={true}
                                style={{
                                  padding: 0,
                                  backgroundColor: 'transparent',
                                }}
                                onClick={() => {
                                  setCartItems(() => {
                                    return cartItems.map((x) => {
                                      if (x._id === item._id) {
                                        x.quantity = x.quantity + 1;
                                      }
                                      return x;
                                    });
                                  });
                                }}
                              >
                                <AddIcon
                                  style={{
                                    fill: theme.palette.common.primary,
                                    fontSize: '1.7rem',
                                  }}
                                />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* for Price */}
                    <Grid item>
                      <Typography variant="h6" align="right">
                        ${item.product[item.license] * item.quantity}
                      </Typography>

                      <span
                        className={classes.label}
                        style={{
                          fontSize: '13px',
                          fontWeight: 300,
                          textAlign: 'right',
                          color: theme.palette.common.primary,
                          cursor: 'pointer',
                        }}
                        onClick={() => props.removeCartHandler(item._id)}
                      >
                        {t['Remove']}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid
          item
          md={4}
          style={{
            borderRadius: '3px',
            boxShadow: '0 10px 5px -5px rg',
            border: 'solid 1px #ededf0',
            padding: '20px 24px',
          }}
        >
          <label className={classes.label}>Items</label>
          <Grid container justify="space-between">
            <Typography className={classes.label} style={{ fontWeight: 300 }}>
              {cartItems.length} Licenses x{' '}
              {cartItems.reduce((total, item) => {
                return total + parseInt(item.quantity);
              }, 0)}{' '}
              Seats
            </Typography>
            <Typography className={classes.label} style={{ fontWeight: 300 }}>
              $
              {cartItems.reduce((total, item) => {
                return total + item.product[item.license] * item.quantity;
              }, 0)}
            </Typography>
          </Grid>
          <Typography
            className={classes.label}
            style={{ fontWeight: 300, marginTop: '0.8em' }}
          >
            {t['(Excluding Taxes)']}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: theme.palette.common.primary,
              marginTop: '0.5em',
              cursor: 'pointer',
            }}
            onClick={redirectToCheckout}
          >
            <label
              className={classes.label}
              style={{ color: theme.palette.common.light, cursor: 'pointer' }}
            >
              {t['Continue to Checkout']}
            </label>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
