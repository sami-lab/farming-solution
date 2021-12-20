import React from 'react';
import {
  Grid,
  Typography,
  useTheme,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Link,
} from '@material-ui/core';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const sampleData = [
  {
    title: 'Love and Beach Family',
    by: 'Bramcreative',
    category: 'Fonts',
    price: '10$',
    image: '/products/01_preview1-.jpg',
  },
  {
    title: 'Doodle Flowers Logo',
    by: 'KetteCreate',
    category: 'Templates',
    price: '10$',
    image:
      '/products/animated-canva-backgrounds-instagram-stories-beige-organic-sand-tones-ana-yvy-11-.webp',
  },
  {
    title: 'Love and Beach Family',
    by: 'KetteCreate',
    category: 'Fonts',
    price: '18$',
    image: '/products/11-.jpg',
  },
];
const useStyles = makeStyles((theme) => ({
  label: {
    ...theme.typography.label,
  },
}));

export default function TopBanner(props) {
  const t = props.languageJson;

  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h2">{t['Staff Picks']}</Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="caption"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              component="a"
              href="#"
            >
              {' '}
              Explore Staff Picks <ChevronRightIcon />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify="center" spacing={2}>
          <Grid item md={3} sm={6} xs={10}>
            <Card
              elevation={0}
              style={{
                border: 'solid 1px #eef0ef',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image="/dev/canva_finds_card.webp"
                  title="Contemplative Reptile"
                />

                <CardContent style={{ paddingTop: '5px' }}>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '6px 8px',
                      borderRadius: '4px',
                      backgroundColor: '#b9ddff',
                      marginBottom: '11px',
                    }}
                  >
                    <label
                      className={classes.label}
                      style={{ fontSize: '12px' }}
                    >
                      {t['FINDS']}
                    </label>
                  </div>
                  <Typography
                    variant="h1"
                    component="h1"
                    style={{ fontSize: '1rem', fontFamily: 'Averta' }}
                  >
                    {t['Check out our Canva Finds!']}
                  </Typography>
                  <Typography
                    component="p"
                    style={{ fontSize: '0.75rem', fontFamily: 'Averta' }}
                  >
                    {
                      t[
                        'Create stunning social media graphics, presentations, and more with our handpicked Canva templates.'
                      ]
                    }
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {props.products.map((item, i) => (
            <Grid item md={3} key={i} sm={6} xs={10}>
              <Card elevation={0}>
                <CardActionArea
                  component={Link}
                  href={`/${item.shopId?.shopName}/${item._id}`}
                >
                  <CardMedia
                    component="img"
                    alt={item.title}
                    image={
                      item.images
                        ? publicRuntimeConfig.backend +
                          '/files/' +
                          item.images[0]
                        : item.image
                    }
                    title={item.title}
                    style={{
                      height: 'calc(100% + 2px)',
                      width: 'calc(100% + 2px)',
                      margin: '-1px',
                      zIndex: 1,
                    }}
                  />

                  <CardContent style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography
                          variant="h1"
                          component="h1"
                          style={{ fontSize: '1rem', fontFamily: 'Averta' }}
                        >
                          {item.title.length > 15
                            ? item.title.toString().slice(0, 15) + '...'
                            : item.title}
                        </Typography>
                        <Typography
                          component="p"
                          style={{
                            fontSize: '0.75rem',
                            fontFamily: 'Averta',
                            color: '#949291',
                            textOverflow: 'ellipsis',
                            lineHeight: 1.3,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {t['by']}{' '}
                          <a
                            style={{ textDecoration: 'none', color: '#615f5c' }}
                          >
                            {item.shopId?.shopName}
                          </a>{' '}
                          {t['in']}{' '}
                          <a
                            style={{ textDecoration: 'none', color: '#615f5c' }}
                          >
                            {item.productCategory}
                          </a>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <div
                          style={{
                            fontWeight: 700,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '6px 5px',
                            minWidth: '40px',
                            minHeight: '25px',
                            borderRadius: '3px',
                            backgroundColor: '#dff8f6',
                          }}
                        >
                          <label className={classes.label}>
                            {' '}
                            {item.personalLicence <= item.commercialLicence &&
                              item.personalLicence <=
                                item.extendedCommercialLicence &&
                              item.personalLicence}
                            {item.commercialLicence <= item.personalLicence &&
                              item.commercialLicence <=
                                item.extendedCommercialLicence &&
                              item.commercialLicence}
                            {item.extendedCommercialLicence <=
                              item.commercialLicence &&
                              item.extendedCommercialLicence <=
                                item.personalLicence &&
                              item.extendedCommercialLicence}
                            $
                          </label>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
