import React, { useState, useEffect } from 'react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Snackbar, Paper, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import CreateIcon from '@material-ui/icons/Create';

import Dialog from '../../src/components/shopSetting/Dialog';
import ShopNameDialog from '../../src/components/shopSetting/ShopNameDialog';

import Header from '../../src/resusable/header';
import Footer from '../../src/resusable/footer';
import RenderProducts from '../../src/resusable/renderProducts';

import {
  updateShopCover,
  updateShopData,
  updateShopProfile,
} from '../../api/shop/shopSettings';
import { getMyShop, getShopById } from '../../api/shop/shop';
import { getProductByShop } from '../../api/product/product';
import Link from 'next/link';
import CheckAuth from '../../src/resusable/checkAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

//this page is just for manager
export default function Shopsetup(props) {
  const t = props.languageJson;

  const router = useRouter();
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [shop, setShop] = useState({
    shopName: 'Shop Name here',
    shopDescription: 'Shop description here',
    shopProfile: `defaultShop.png`,
    shopCover: '',
  });
  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
    severity: '',
  });
  const [manager, setManager] = useState(
    props.user &&
      props.user?.roles &&
      props.user?.roles.some((x) => x.name === 'Manager')
  );

  useEffect(async () => {
    if (router.query.id && !manager) {
      if (manager) {
        await findShopData(props.userToken);
        await getProducts(props.user.shop._id);
      } else {
        console.log(router.query.id, '--------------');
        await findShopData(router.query.id);
        await getProducts(router.query.id);
      }
    }
  }, [router.query.id]);
  const bannerImageChangeHandler = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    try {
      setLoading({
        active: true,
        action: 'shopCover',
      });
      const response = await updateShopCover(props.userToken, selected);
      const result = response.data;
      if (result.status === 'success') {
        setShop({
          ...shop,
          shopCover: `${result.data.doc.shopCover}`,
        });
        setShowToast({
          active: true,
          message: t['Shop Cover Updated Successfully'],
          severity: 'success',
        });
      } else {
        setShowToast({
          active: true,
          message: t['Failed to upload Banner Image'],
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
  const profileImageChangeHandler = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    try {
      setLoading({
        active: true,
        action: 'shopProfile',
      });
      const response = await updateShopProfile(props.userToken, selected);
      const result = response.data;
      if (result.status === 'success') {
        setShop({
          ...shop,
          shopProfile: result.data.doc.shopProfile,
        });
        setShowToast({
          active: true,
          message: t['Shop Profile Updated Successfully'],
          severity: 'success',
        });
      } else {
        setShowToast({
          active: true,
          message: t['Failed to upload Profile Image'],
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
        message: t['Invalid file type'],
        severity: 'error',
      });
    }
  };
  const shopDataSubmitHandler = async () => {
    if (shop.shopName === '' || shop.shopDescription === '') {
      setShowToast({
        active: true,
        message: t['Invalid Data'],
        severity: 'error',
      });
    }
    try {
      setLoading({
        active: true,
        action: 'shopData',
      });
      const response = await updateShopData(props.userToken, shop);
      const result = response.data;
      if (result.status === 'success') {
        setShowToast({
          active: true,
          message: t['Shop data Updated Successfully'],
          severity: 'success',
        });
      } else {
        setShowToast({
          active: true,
          message: t['Failed to Update Shop Data'],
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

  const findShopData = async (id) => {
    try {
      setLoading({
        active: true,
        action: 'page',
      });
      let response = null;
      if (manager) {
        response = await getMyShop(id);
      } else {
        response = await getShopById(id);
      }

      let result = await response.json();

      if (result.status === 'success') {
        setShop(result.data.doc);
      }
      setLoading({
        active: false,
        action: '',
      });
    } catch (e) {
      console.log(e.message);
      setLoading({
        active: false,
        action: '',
      });
      setShowToast({
        active: true,
        message: t['Failed to Load Shop Data'],
        severity: 'error',
      });
    }
  };

  const addProducts = () => {
    router.push('/createProduct');
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

  const getProducts = async (shopId) => {
    try {
      let response = await getProductByShop(shopId);
      let result = await response.json();
      if (result.status === 'success') {
        setProducts(result.data.doc);
      }
    } catch (e) {
      console.log(e.message);

      setShowToast({
        active: true,
        message: t['Failed to Load Products'],
        severity: 'error',
      });
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Header {...props} languageJson={t} />
      </Grid>
      <Snackbar
        open={showToast.active}
        autoHideDuration={4000}
        onClose={handleToastClose}
      >
        <Alert onClose={handleToastClose} severity={showToast.severity}>
          {showToast.message}
        </Alert>
      </Snackbar>
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12} container>
        <Paper
          // className={classes.paper}
          style={{
            backgroundImage: `url(${publicRuntimeConfig.backend}/files/${shop.shopCover})`,
            backgroundColor: shop.shopCover ? null : '#edf1f7',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '192px',
            width: '100%',
            marginBottom: '60px',
            // width: "1328px",
          }}
          xs={12}
          xl={12}
          lg={12}
          md={12}
          sm={6}
        >
          <Paper
            style={{
              height: '192px',
              width: '387px',
              margin: '0 auto',
              backgroundColor: 'transparent',
              backgroundSize: 'cover',
              border: 'none',
            }}
            elevation={manager && !shop.shopCover ? 1 : 0}
          >
            <div
              // className={classes.paper}
              style={{
                position: 'absolute',
                height: '113px',
                width: '358px',
                margin: '10px 15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                opacity: 0.8,
              }}
            >
              <div>
                {manager ? (
                  <div>
                    <input
                      onChange={bannerImageChangeHandler}
                      accept="image/*"
                      className={classes.input}
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      type="file"
                    />
                    <label htmlFor="raised-button-file">
                      <Button
                        variant="raised"
                        component="span"
                        className={classes.button}
                        style={{ backgroundColor: '#3d3030', color: 'white' }}
                      >
                        {t['Upload Banner']}
                      </Button>
                    </label>

                    <Typography variant="h6" align="center">
                      <Dialog languageJson={t} />
                    </Typography>
                  </div>
                ) : null}
                <div style={{ position: 'relative' }}>
                  <img
                    style={{
                      position: manager ? 'absolute' : 'relative',
                      borderRadius: '50%',
                      marginTop: manager ? '40px' : null,
                      marginLeft: manager ? '35px' : null,

                      top: manager ? null : '125px',
                      border: '1px solid gray',
                    }}
                    width="100px"
                    height="100px"
                    src={
                      publicRuntimeConfig.backend + '/files/' + shop.shopProfile
                    }
                  />
                </div>

                {manager ? (
                  <div
                    style={{
                      position: 'absolute',
                      marginTop: '108px',
                      marginLeft: '112px',
                    }}
                  >
                    <div style={{ display: 'none' }}>
                      <input
                        onChange={profileImageChangeHandler}
                        accept="image/*"
                        className={classes.input}
                        style={{ display: 'none' }}
                        id="raised-button-file1"
                        multiple
                        type="file"
                      />
                    </div>
                    <label htmlFor="raised-button-file1">
                      <CreateIcon
                        style={{
                          color: '#305085',
                          fontSize: '25px',
                          backgroundColor: '#fff',
                          border: '1px solid #000',
                          borderRadius: 50,
                          cursor: 'pointer',
                        }}
                      />
                    </label>
                  </div>
                ) : null}
              </div>
            </div>
          </Paper>
        </Paper>
      </Grid>
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        <Typography variant="h4" component="h2" align="center">
          {shop.shopName}
        </Typography>
        <Typography variant="subtitle2" align="center">
          {shop.shopDescription}
        </Typography>
        <Typography>
          {manager ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '10px 0',
              }}
            >
              <CreateIcon style={{ color: '#305085', fontSize: '15px' }} />
              <ShopNameDialog
                shop={shop}
                setShop={setShop}
                shopDataSubmitHandler={shopDataSubmitHandler}
                loading={loading.active && loading.action === 'shopData'}
                languageJson={t}
              />{' '}
            </div>
          ) : null}
        </Typography>
      </Grid>
      <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
        {manager ? (
          <Paper
            style={{
              height: '200px',
              margin: '20px 50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid grey',
              cursor: 'pointer',
            }}
            onClick={addProducts}
          >
            <Link href="/createProduct">
              <Typography>{t['Add Products']} </Typography>
            </Link>
          </Paper>
        ) : null}
      </Grid>
      <Grid
        item
        container
        xs={12}
        style={{ marginTop: '1em', marginBottom: '1em' }}
      >
        <RenderProducts products={products} />
      </Grid>
      <Grid item>
        <Footer languageJson={t} />
      </Grid>
    </Grid>
  );
}
