import React, { useEffect, useState } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
const { publicRuntimeConfig } = getConfig();
import {
  Button,
  Grid,
  Typography,
  Paper,
  Divider,
  Container,
  FormControl,
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
  Chip,
  Breadcrumbs,
  makeStyles,
  useTheme,
  IconButton,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import Rating from '@material-ui/lab/Rating';
import Link from '@material-ui/core/Link';
import html_Parser from 'html-react-parser';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import RemoveIcon from '@material-ui/icons/Remove';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TimelineIcon from '@material-ui/icons/Timeline';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import TableChartIcon from '@material-ui/icons/TableChart';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import AddIcon from '@material-ui/icons/Add';

import Header from '../../src/resusable/header';
import Footer from '../../src/resusable/footer';
import CommentExampleMetadata from '../../src/components/products/commentSection';
import ImageCarousel from '../../src/components/products/imageCarousel';

import { getProductById } from '../../api/product/product';
import { addToCart } from '../../api/cart/cart';

import Loading from '../../src/resusable/spinner';

const sample = {
  title: 'new bundle 38 in 1 -9000 graphics',
  productCategory: 'Graphics',
  shop: {
    id: '1',
    shopName: 'Graphics guro',
    shopDescription: 'Some best selling things',
  },
  videoUrl: '', //if there is video url show video instead of images
  images: ['anyimage..png', 'anyimage.png'],
  description: '',
  details: 'paste some html here and render',
  file: '',
  fileSize: '591KB',
  personalLicence: '49',
  commercialLicence: '59',
  extendedCommercialLicence: '69',
  date: '08/08/2021',
  compatibleWith: [
    'Adobe PhotoShop',
    'Illustrator',
    'After effect',
    'Adobe XD',
  ],
  layered: false, //if true display it in product specs
  tileable: false, //if true display it in product specs
  vector: false, //if true display it in product specs
  tags: ['Bundle', 'Whole Shop', 'Gradient'],
  reviews: [
    {
      name: 'Jem Thamos',
      profile: '/dev/empty.jpg', //if there is no photo use any sample user photo
      message:
        'Wow! SO many amazing elements!! Easily one of my best purchases on Creative Market!',
      rating: 5,
      date: new Date(), //should be in format 1 min ago
    },
  ],
};

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
}));

export default function Shopsetup(props) {
  const t = props.languageJson;

  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [license, setLicense] = useState('personalLicence');
  const [product, setProduct] = useState({});

  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
    severity: '',
  });
  useEffect(async () => {
    try {
      setLoading({
        active: true,
        action: 'page',
      });

      let response = await getProductById(router.query.id);
      let result = await response.json();
      if (result.status === 'success') {
        setProduct(result.data.doc);
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
  }, [router.query.id]);

  const cartHandler = async () => {
    try {
      setLoading({
        active: true,
        action: 'addToCart',
      });
      const response = await addToCart(
        props.userToken,
        product._id,
        quantity,
        license
      );
      const result = response.data;
      if (result.status === 'success') {
        setShowToast({
          active: true,
          message: t['Item Added To Cart Successfully'],
          severity: 'success',
        });
      } else {
        setShowToast({
          active: true,
          message: t['Failed to Add Item to Cart'],
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
        message: err?.response?.data?.error
          ? err?.response?.data?.error
          : 'Something went wrong',
        severity: 'error',
      });
    }
  };

  const redirectToCheckout = () => {
    const query = [
      {
        id: product._id,
        license: license,
        quantity: quantity,
        image: product.images[0],
        title: product.title,
        shopId: product.shopId.id,
        shopName: product.shopId.shopName,
        price: product[license],
      },
    ];

    router.push({
      pathname: '/checkout',
      query: {
        data: JSON.stringify(query),
      },
    });
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

  if (loading.active && loading.action === 'page') {
    return <Loading />;
  }

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
      <Grid item>
        <Header {...props} languageJson={t} />
      </Grid>

      {/* For Breadcrumbs and starting price */}
      <Grid
        item
        container
        justifyContent="space-between"
        style={{ marginTop: '1em' }}
        className={classes.root}
      >
        <Grid item>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link href={`/category/${product.productCategory}`}>
              <Typography variant="h6"> {product.productCategory}</Typography>
            </Link>
            <Typography variant="h6">{product.title}</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Typography variant="h2">
            {t['Starting At $']}
            {product.personalLicence <= product.commercialLicence &&
              product.personalLicence <= product.extendedCommercialLicence &&
              product.personalLicence}
            {product.commercialLicence <= product.personalLicence &&
              product.commercialLicence <= product.extendedCommercialLicence &&
              product.commercialLicence}
            {product.extendedCommercialLicence <= product.commercialLicence &&
              product.extendedCommercialLicence <= product.personalLicence &&
              product.extendedCommercialLicence}
          </Typography>
        </Grid>
      </Grid>
      {/* Images and Detials card */}
      <Grid
        item
        style={{ marginTop: '1em' }}
        container
        className={classes.root}
        spacing={3}
      >
        <Grid item xs={12} md={8}>
          <ImageCarousel images={product.images} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} style={{ padding: '1em 2em' }}>
            <Grid container direction="column">
              {/* For title */}
              <Grid item>
                <Typography variant="h2">{product.title}</Typography>
              </Grid>
              {/* reviews */}
              {product.reviews && product.reviews.length > 0 && (
                <Grid item>
                  <Grid container>
                    <Rating
                      style={{ fontSize: '16px' }}
                      name="read-only"
                      value={(
                        product.reviews.reduce(
                          (total, review) => total + review.rating,
                          0
                        ) / product.reviews.length
                      ).toFixed(2)}
                      readOnly
                    />
                    <Typography
                      variant="body2"
                      style={{ color: theme.palette.common.primary }}
                    >
                      {product.reviews.length} Review
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {/* Shop owwner */}
              <Grid item>
                <Typography variant="body2">
                  {t['by']}{' '}
                  <Link href={`/shop/${product.shopId?.id}`}>
                    <a style={{ color: theme.palette.common.primary }}>
                      {' '}
                      {product.shopId?.shopName}
                    </a>
                  </Link>
                </Typography>
              </Grid>
              {/* Divider */}
              <Grid item style={{ marginTop: '1em', marginBottom: '1em' }}>
                <Divider />
              </Grid>
              {/* Quantity */}
              <Grid item container justifyContent="space-between">
                {/* Text */}
                <Grid item>
                  <Typography variant="subtitle2">
                    {t['License Type']}
                    {/* <Link
                    href="/"
                    style={{
                      fontSize: '13px',
                      color: '#69bf93',
                      marginLeft: '5px',
                    }}
                  >
                    What are these?
                  </Link> */}
                  </Typography>
                </Grid>
                {/* Quantity */}
                <Grid item>
                  <Grid container alignItems="center" spacing={2}>
                    {quantity > 1 && (
                      <Grid item>
                        <IconButton
                          onClick={() => setQuantity((q) => q - 1)}
                          style={{
                            backgroundColor: 'transparent',
                            padding: 0,
                          }}
                        >
                          <RemoveIcon
                            style={{
                              color: theme.palette.common.primary,
                              fontSize: '18px',
                            }}
                          />
                        </IconButton>
                      </Grid>
                    )}
                    <Grid item>
                      <Typography variant="body2">{quantity} seat</Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() => setQuantity((q) => q + 1)}
                        style={{ backgroundColor: 'transparent', padding: 0 }}
                      >
                        <AddIcon
                          style={{
                            color: theme.palette.common.primary,
                            fontSize: '18px',
                          }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* personalLicence */}
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
                style={{ marginTop: '0.5em' }}
              >
                <Grid item>
                  <FormControlLabel
                    value="personalLicence"
                    control={
                      <Radio
                        style={{ color: theme.palette.common.primary }}
                        name="license"
                        checked={license === 'personalLicence'}
                      />
                    }
                    onChange={() => setLicense('personalLicence')}
                    label={
                      <Typography className={classes.label}>
                        Personal
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.label}>
                    ${product.personalLicence}
                  </Typography>
                </Grid>
              </Grid>
              {/* commercialLicence */}
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <FormControlLabel
                    value="commercialLicence"
                    control={
                      <Radio
                        style={{ color: theme.palette.common.primary }}
                        name="license"
                        checked={license === 'commercialLicence'}
                      />
                    }
                    onChange={() => setLicense('commercialLicence')}
                    label={
                      <Typography className={classes.label}>
                        Commercial
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.label}>
                    ${product.commercialLicence}
                  </Typography>
                </Grid>
              </Grid>
              {/* extendedCommercialLicence */}
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <FormControlLabel
                    value="extendedCommercialLicence"
                    control={
                      <Radio
                        style={{ color: theme.palette.common.primary }}
                        name="license"
                        checked={license === 'extendedCommercialLicence'}
                      />
                    }
                    onChange={() => setLicense('extendedCommercialLicence')}
                    label={
                      <Typography className={classes.label}>
                        Extended Commercial
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.label}>
                    ${product.extendedCommercialLicence}
                  </Typography>
                </Grid>
              </Grid>
              {/* Divider */}
              <Grid item style={{ marginTop: '1em', marginBottom: '1em' }}>
                <Divider />
              </Grid>
              {/* Add to cart */}
              <Grid item style={{ width: '100%' }}>
                <Button
                  style={{ backgroundColor: '#32a889', color: 'white' }}
                  fullWidth
                  variant="contained"
                  onClick={cartHandler}
                  disabled={loading.active && loading.action === 'addToCart'}
                >
                  {loading.active && loading.action === 'addToCart' ? (
                    <CircularProgress />
                  ) : (
                    'Add to Cart'
                  )}
                </Button>
              </Grid>
              {/* buy now */}
              <Grid
                item
                style={{ width: '100%' }}
                style={{ marginTop: '1em', marginBottom: '1em' }}
              >
                <Button
                  fullWidth={true}
                  style={{
                    border: '2px solid #32a889',
                    backgroundColor: 'white',

                    color: '#32a889',
                  }}
                  variant="contained"
                  onClick={redirectToCheckout}
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Product details */}
      <Grid
        item
        style={{ marginTop: '2em' }}
        container
        spacing={3}
        className={classes.root}
      >
        <Grid item md={8} xs={12}>
          <Grid container direction="column" justifyContent="center">
            <Grid item>
              <Typography variant="h2" style={{ fontWeight: '700' }}>
                {t['About the Product']}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">{product.description}</Typography>
            </Grid>
            <Grid
              item
              style={{ width: '100%', marginTop: '1em', marginBottom: '1em' }}
            >
              <Divider />
            </Grid>
            <Grid item>{html_Parser(sample.details)}</Grid>
          </Grid>
        </Grid>

        <Grid item md={4} xs={12}>
          <Grid container direction="column">
            {/* Headng */}
            <Grid item>
              <Typography variant="h2" style={{ fontWeight: '700' }}>
                {t['Product Specs']}
              </Typography>
            </Grid>
            {/* Date */}
            <Grid item style={{ marginTop: '0.5em' }}>
              <Typography
                variant="h6"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '400',
                }}
              >
                <DateRangeIcon
                  style={{ marginRight: '0.3em', fontSize: '2rem' }}
                />{' '}
                {t['Created']}: {new Date(product.date).toDateString()}
              </Typography>
            </Grid>
            {/* compatibleWith */}
            <Grid item style={{ marginTop: '0.5em' }}>
              <Typography
                variant="h6"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '400',
                }}
              >
                <SwapHorizIcon
                  style={{ marginRight: '0.3em', fontSize: '2rem' }}
                />{' '}
                {t['Compatible with']}:{' '}
                {product.compatibleWith?.map((ite) => ite)}
              </Typography>
            </Grid>
            {/* filesize */}
            <Grid item style={{ marginTop: '0.5em' }}>
              <Typography
                variant="h6"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '400',
                }}
              >
                <InsertDriveFileIcon
                  style={{ marginRight: '0.3em', fontSize: '2rem' }}
                />{' '}
                {t['File Size']} :{' '}
                {product.fileSize ? product.fontSize : 'Not available'}
              </Typography>
            </Grid>
            {/* vector */}
            {product.vector && (
              <Grid item style={{ marginTop: '0.5em' }}>
                <Typography
                  variant="h6"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '400',
                  }}
                >
                  <TimelineIcon
                    style={{ marginRight: '0.3em', fontSize: '2rem' }}
                  />{' '}
                  {t['Vector']}
                </Typography>
              </Grid>
            )}
            {/* tilable     */}
            {product.tileable && (
              <Grid item style={{ marginTop: '0.5em' }}>
                <Typography
                  variant="h6"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '400',
                  }}
                >
                  <DonutSmallIcon
                    style={{ marginRight: '0.3em', fontSize: '2rem' }}
                  />{' '}
                  {t['Tileable']}
                </Typography>
              </Grid>
            )}
            {/* Layered     */}
            {product.layered && (
              <Grid item style={{ marginTop: '0.5em' }}>
                <Typography
                  variant="h6"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '400',
                  }}
                >
                  <TableChartIcon
                    style={{ marginRight: '0.3em', fontSize: '2rem' }}
                  />{' '}
                  {t['Layered']}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* reviews */}
      <Grid
        item
        container
        direction="column"
        style={{ marginTop: '2em' }}
        className={classes.root}
      >
        {product.reviews &&
          product.reviews.length > 0 &&
          product.reviews.map((review) => (
            <Grid item>
              <CommentExampleMetadata
                image={review.profile}
                name={review.name}
                rating={review.rating}
                message={review.message}
                date={review.date}
              />
            </Grid>
          ))}
      </Grid>
      {/* Tags */}
      <Grid
        item
        container
        direction="column"
        style={{ marginTop: '1em' }}
        className={classes.root}
      >
        <Grid item>
          <Typography variant="subtitle1">{t['Keep Exploring']}</Typography>
        </Grid>
        <Grid item container style={{ marginTop: '0.6em' }}>
          {sample.tags.map((tag) => (
            <Chip
              style={{
                backgroundColor: '#cce0ff',
                border: 'none',
                margin: '5px 2px',
              }}
              label={tag}
              variant="outlined"
              key={tag}
            />
          ))}
        </Grid>
      </Grid>
      {/* Other Products details */}
      <Grid
        item
        container
        direction="column"
        style={{ marginTop: '1em' }}
        className={classes.root}
      >
        {/* Meet the Shop */}
        <Grid item>
          <Typography variant="subtitle1"> {t['Meet The Shop']}</Typography>
        </Grid>
        {/* Cards */}
        <Grid item style={{ marginTop: '1em' }}>
          <Grid container>
            {/* Shop */}
            <Grid item md={4} xs={12}>
              <Grid
                component={Paper}
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ padding: '2em' }}
                spacing={1}
                elevation={2}
              >
                {/* for image */}
                <Grid item>
                  <img
                    src={
                      publicRuntimeConfig.backend +
                      '/files/' +
                      product.shopId?.shopProfile
                    }
                    alt="profile"
                    width="75px"
                    height="75px"
                  />
                </Grid>
                {/* For Shopname */}
                <Grid item>
                  <Typography
                    align="center"
                    style={{ fontSize: '1.3rem' }}
                    className={classes.label}
                  >
                    {product.shopId?.shopName}
                  </Typography>
                </Grid>
                {/* shopDescription */}
                <Grid item>
                  <Typography variant="subtitle2">
                    {product.shopId?.shopDescription}
                  </Typography>
                </Grid>
                {/* Link */}
                <Grid item>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Link href={`/shop/${product.shopId?.id}`}>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: '#32a889',
                          fontSize: '15px',
                          marginRight: '5px',
                          color: 'white',
                        }}
                      >
                        {t['Visit']}
                      </Button>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* footer */}
      <Grid item>
        <Footer languageJson={t} />
      </Grid>
    </Grid>
  );
}
