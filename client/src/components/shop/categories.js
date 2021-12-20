import React from 'react';
import Link from 'next/link';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from '@material-ui/core';
export default function Categories(props) {
  return (
    <Grid container justify="center" spacing={2}>
      {props.categories.map((item, i) => (
        <Grid item md={4} key={i} sm={6} xs={10}>
          <Card elevation={0} style={{ padding: '0.5em' }}>
            <Link href="/category">
              <a style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  alt={item.title}
                  image={item.image}
                  style={{
                    height: 'calc(100% + 2px)',
                    width: 'calc(100% + 2px)',
                    margin: '-1px',
                    zIndex: 1,
                  }}
                />

                <Typography
                  style={{
                    marginTop: '0.3em',
                    fontFamily: 'Averta',
                    fontSize: '14px',
                  }}
                >
                  {item.name}
                </Typography>
              </a>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
