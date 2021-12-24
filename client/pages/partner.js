import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { makeStyles } from '@material-ui/styles';
import Header from '../src/resusable/header';
import Hero from '../src/components/shop/hero';
import ShopPerks from '../src/components/shop/perks';
import Categories from '../src/components/shop/categories';
import OpenShop from '../src/components/shop/openShopDialog';
import Footer from '../src/resusable/footer';
import Loading from '../src/resusable/spinner';
import CheckAuth from '../src/resusable/checkAuth';
import { getMyShop } from '../api/shop/shop';

const sample = [
  {
    name: 'Graphics',
    title: 'Stunning Display Fonts',
    details:
      'Browse over 15,000 display fonts to use for eye-catching signs, posters, and headers. These display font sets include serif, sans serif, and script fonts in vintage, retro, and modern styles to improve legibility in large formats.',
    created: new Date(),
    image: '/categories/graphics.jpg',
  },

  {
    name: 'Templates',
    title: 'Stunning Display Fonts',
    details:
      'Browse over 15,000 display fonts to use for eye-catching signs, posters, and headers. These display font sets include serif, sans serif, and script fonts in vintage, retro, and modern styles to improve legibility in large formats.',
    created: new Date(),
    image: '/categories/templates.jpg',
  },
  {
    name: 'Fonts',
    title: 'Stunning Display Fonts',
    details:
      'Browse over 15,000 display fonts to use for eye-catching signs, posters, and headers. These display font sets include serif, sans serif, and script fonts in vintage, retro, and modern styles to improve legibility in large formats.',
    created: new Date(),
    image: '/categories/fonts.jpg',
  },
  {
    name: 'Add-Ons',
    title: 'Stunning Display Fonts',
    details:
      'Browse over 15,000 display fonts to use for eye-catching signs, posters, and headers. These display font sets include serif, sans serif, and script fonts in vintage, retro, and modern styles to improve legibility in large formats.',
    created: new Date(),
    image: '/categories/addOns.jpg',
  },
  {
    name: 'Web Themes',
    title: 'Stunning Display Fonts',
    details:
      'Browse over 15,000 display fonts to use for eye-catching signs, posters, and headers. These display font sets include serif, sans serif, and script fonts in vintage, retro, and modern styles to improve legibility in large formats.',
    created: new Date(),
    image: '/categories/webThemes.jpg',
  },
  {
    name: 'Photos',
    title: 'Stunning Display Fonts',
    details:
      'Browse over 15,000 display fonts to use for eye-catching signs, posters, and headers. These display font sets include serif, sans serif, and script fonts in vintage, retro, and modern styles to improve legibility in large formats.',
    created: new Date(),
    image: '/categories/photos.jpg',
  },
];
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
  alert: {
    padding: '4px 16px',
  },
  input: {
    '&::placeholder': {
      fontFamily: 'Averta',
      fontWeight: 400,
      fontSize: '1.1rem',
    },
  },
}));

export default function CreateShop(props) {
  const t = props.languageJson;

  const router = useRouter();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [shopPending, setShopPending] = useState(false);
  const [shopApproved, setShopApproved] = useState(false);
  const [openShopModal, setOpenShop] = useState(false);

  const shopSubmitted = () => {
    setShopPending(true);
  };
  useEffect(async () => {
    try {
      setLoading(true);
      const response = await getMyShop(props.userToken);
      let result = await response.json();
      if (result.status === 'success') {
        if (!result.data.doc.shopStatus) {
          setShopPending(true);
        } else {
          setShopApproved(true);
        }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);

  return (
    <CheckAuth {...props}>
      <Grid container direction="column">
        <Grid item>
          <OpenShop
            open={openShopModal}
            onClose={() => setOpenShop(false)}
            token={props.userToken}
            shopApproved={shopSubmitted}
            languageJson={t}
          />
          <Header {...props} languageJson={t} />
        </Grid>
        {shopPending && (
          <Grid
            item
            style={{ marginTop: '2em', marginBottom: '2m' }}
            className={classes.root}
          >
            <Alert
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#DCEEFC',
              }}
              classes={{
                root: classes.alert,
              }}
              icon={
                <img
                  src="/dev/annoucement.svg"
                  style={{ width: '1em', height: '1em' }}
                />
              }
            >
              {' '}
              <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
                {' '}
                {t['Your Shop Status is Pending for approval by admin']}
              </Typography>
            </Alert>
          </Grid>
        )}
        {shopApproved && (
          <Grid
            item
            style={{ marginTop: '2em', marginBottom: '2m' }}
            className={classes.root}
          >
            <Alert
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#DCEEFC',
              }}
              classes={{
                root: classes.alert,
              }}
              icon={
                <img
                  src="/dev/annoucement.svg"
                  style={{ width: '1em', height: '1em' }}
                />
              }
            >
              {' '}
              <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
                {' '}
                {t['Your Shop is approved']}{' '}
                <Link href="/shop/myShop">{t['Visit now']} </Link>
              </Typography>
            </Alert>
          </Grid>
        )}
        <Grid
          item
          style={{ alignSelf: 'center' }}
          className={classes.root}
          md={12}
          sm={10}
          xs={12}
        >
          {loading ? (
            <Loading />
          ) : (
            <Hero
              setOpenShop={setOpenShop}
              shopPending={shopPending}
              shopApproved={shopApproved}
              languageJson={t}
            />
          )}
        </Grid>
        <Grid
          md={7}
          sm={10}
          item
          style={{ marginTop: matchesSM ? '2em' : '4em', alignSelf: 'center' }}
        >
          <ShopPerks languageJson={t} />
        </Grid>
        <Grid
          item
          container
          justify="center"
          style={{
            backgroundColor: '#F4F8FB',
            marginBottom: 0,
            marginTop: '2.5em',
          }}
        >
          <Grid
            item
            md={7}
            sm={10}
            style={{ marginTop: '2em', marginBottom: '2em' }}
          >
            <p
              style={{
                textAlign: 'center',
                fontFamily: 'Averta',
                marginBottom: '2em',
              }}
            >
              {t['Find your niche within our categories']}
            </p>
            <Categories categories={sample} languageJson={t} />
          </Grid>
        </Grid>

        <Grid
          md={7}
          sm={10}
          item
          style={{
            marginTop: matchesSM ? '2em' : '4em',

            alignSelf: 'center',
          }}
        >
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography
                variant="h1"
                align="center"
                style={{ fontWeight: '500' }}
              >
                {t['Producers Stories']}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h2"
                align="center"
                style={{ fontWeight: '300' }}
              >
                {
                  t[
                    'Our community of producers share their stories about how Creative Market helps them spend more time doing what they love.'
                  ]
                }
              </Typography>
            </Grid>
            <Grid item>
              <Divider style={{ marginTop: '1em', marginBottom: '1em' }} />
              <p style={{ textAlign: 'center', fontFamily: 'Averta' }}>
                {t['Sound good? Join our community of shop owners today']}
              </p>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                style={{
                  background: shopPending
                    ? 'gray'
                    : theme.palette.common.primary,
                  padding: '7px 20px',
                  opacity: shopPending ? 0.7 : 1,
                }}
                onClick={() =>
                  shopApproved ? router.push('/shop/myShop') : setOpenShop(true)
                }
                disabled={shopPending}
              >
                <Typography
                  variant="h6"
                  style={{ color: shopPending ? '#000' : '#fff' }}
                  //onClick={props.openModal}
                >
                  {shopApproved
                    ? t['Visit Shop']
                    : shopPending
                    ? t['Shop is Pending']
                    : t['Open a Shop']}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: '3em' }}>
          <Footer languageJson={t} />
        </Grid>
      </Grid>
    </CheckAuth>
  );
}
