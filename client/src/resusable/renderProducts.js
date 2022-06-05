import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  useTheme,
  Link,
} from "@material-ui/core";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    ...theme.typography.label,
  },
}));
export default function RenderProducts(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid container alignItems="flex-end" justifyContent="center" spacing={2}>
      {props.products.map((item, i) => (
        <Grid
          item
          md={props.md ? props.md : 3}
          key={i}
          sm={props.sm ? props.sm : 6}
          xs={props.xs ? props.xs : 10}
        >
          <Card elevation={0}>
            <CardActionArea
              component={Link}
              href={`/${item.shop?.shopName}/${item._id}`}
            >
              <CardMedia
                component="img"
                alt={item.title}
                image={
                  item.images
                    ? publicRuntimeConfig.backend + "/files/" + item.images[0]
                    : item.image
                }
                title={item.title}
                style={{
                  height: "calc(100% + 2px)",

                  width: "calc(100% + 2px)",
                  margin: "-1px",
                  zIndex: 1,
                }}
              />

              <CardContent
                style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}
              >
                <Grid container justify="space-between" wrap="nowrap">
                  <Grid item>
                    <Typography
                      variant="h1"
                      component="h1"
                      style={{ fontSize: "1rem", fontFamily: "Averta" }}
                    >
                      {item.title?.length > 15
                        ? item.title?.toString().slice(0, 15) + "..."
                        : item.title}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "0.66rem",
                        fontFamily: "Averta",
                        color: "#949291",
                        textOverflow: "ellipsis",
                        lineHeight: 1.3,
                      }}
                    >
                      by{" "}
                      <Link href={`/shop/${item.shop?._id}`}>
                        <a style={{ textDecoration: "none", color: "#615f5c" }}>
                          {item.shop?.shopName}
                        </a>
                      </Link>{" "}
                      in{" "}
                      <a style={{ textDecoration: "none", color: "#615f5c" }}>
                        {item.productCategory}
                      </a>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <div
                      style={{
                        fontWeight: 700,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "6px 5px",
                        minWidth: "40px",
                        minHeight: "25px",
                        borderRadius: "3px",
                        backgroundColor: "#dff8f6",
                      }}
                    >
                      <label className={classes.label}> RS {item.price}</label>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ padding: 0 }}>
              {props.cart && (
                <Grid container>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => props.cartHandler(item._id)}
                    style={{
                      backgroundColor: "transparent",
                      color: theme.palette.common.primary,
                      borderColor: theme.palette.common.primary,
                      marginTop: "0.3em",
                    }}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
