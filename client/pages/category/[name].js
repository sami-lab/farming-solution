import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Header from "../../src/resusable/header";
import Footer from "../../src/resusable/footer";
import RenderProducts from "../../src/resusable/renderProducts";
import Error from "../../src/resusable/error";
import { getProductByCategory } from "../../api/product/product";
import OpenShop from "../../src/components/Home/openShop";
const sampleProducts = [
  {
    id: "1",
    title: "Love and Beach Family",
    shopOwner: "KetteCreate",
    category: "Fonts",
    price: "18",
    image: "/products/11-.jpg",
  },
  {
    id: "2",
    title: "Love and Beach Family",
    shopOwner: "Bramcreative",
    category: "Fonts",
    price: "10",
    image: "/products/01_preview1-.jpg",
  },
  {
    id: "3",
    title: "Doodle Flowers Logo",
    shopOwner: "KetteCreate",
    category: "Templates",
    price: "10",
    image:
      "/products/animated-canva-backgrounds-instagram-stories-beige-organic-sand-tones-ana-yvy-11-.webp",
  },
  {
    id: "4",
    title: "Love and Beach Family",
    shopOwner: "KetteCreate",
    category: "Fonts",
    price: "18",
    image: "/products/11-.jpg",
  },
];

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
  label: {
    ...theme.typography.label,
    fontWeight: "300",
  },
  input: {
    fontFamily: "Averta",
    fontWeight: 300,
    fontSize: "1.1rem",
    "&::placeholder": {
      fontFamily: "Averta",
      fontWeight: "300",
      fontSize: "1.1rem",
    },
  },
}));

export default function Category(props) {
  const t = props.languageJson;

  const cat = props.categories;
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [category, setCategory] = useState(
    cat.filter((x) => x.name === router.query.name)[0]
  );
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filterCategoryProducts, setFilterCaregoryProducts] =
    useState("popular");
  const filterCategoryProductsList = [
    {
      value: "newest",
      label: "Newest",
    },
    {
      value: "popular",
      label: "Popular",
    },
    {
      value: "price>",
      label: "Price: Low to High",
    },
    {
      value: "price<",
      label: "Price: High to Low",
    },
  ];

  const getProducts = async (category) => {
    try {
      let response = await getProductByCategory(category);
      let result = await response.json();
      if (result.status === "success") {
        setCategoryProducts(result.data.doc);
      }
    } catch (e) {
      console.log(e.message);

      setShowToast({
        active: true,
        message: "Failed to Load Products",
        severity: "error",
      });
    }
  };
  useEffect(() => {
    setCategory(cat.filter((x) => x.name === router.query.name)[0]);
    getProducts(router.query.name);
  }, [router.query.name]);
  if (!category) {
    return <Error message={t["Category not found"]} />;
  }
  return (
    <Grid container direction="column">
      {/* Header display here */}
      <Grid item container>
        <Header {...props} languageJson={t} />
      </Grid>
      {/* category name cober */}
      <Grid
        item
        style={{
          backgroundImage: "url(/dev/category.webp)",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          padding: "40px 0",
        }}
      >
        <div style={{ width: "60%" }}>
          <Typography
            variant="h1"
            style={{ marginBottom: "0.35em", textAlign: "center" }}
          >
            {category.heading}
          </Typography>
          <Typography className={classes.label} align="center">
            {category.details}
          </Typography>
        </div>
      </Grid>
      {/* category filter */}
      <Grid item style={{ marginTop: "2em" }} className={classes.root}>
        <Grid container justify="space-between">
          <Grid item>
            <Button
              variant="outlined"
              style={{
                backgroundColor: "transparent",
                borderColor: theme.palette.common.primary,
                padding: "10px 20px",
              }}
            >
              <label
                className={classes.label}
                style={{ color: theme.palette.common.primary }}
              >
                {" "}
                {t["Filter"]}
              </label>
            </Button>
          </Grid>
          <Grid item>
            <TextField
              id="filterCategoryProducts"
              select
              size="small"
              style={{ width: "15em" }}
              value={filterCategoryProducts}
              onChange={(e) => setFilterCaregoryProducts(e.target.value)}
              SelectProps={{
                native: true,
              }}
              variant="outlined"
              InputProps={{
                classes: {
                  input: classes.input,
                },
              }}
            >
              {filterCategoryProductsList.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className={classes.label}
                >
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>
      {/* products */}
      <Grid
        item
        container
        style={{ marginTop: "2em" }}
        className={classes.root}
      >
        {categoryProducts.length > 0 ? (
          <RenderProducts products={categoryProducts} />
        ) : (
          <Typography variant="h2" align="center">
            {t["No Product addded in this category"]}
          </Typography>
        )}
      </Grid>
      {/* Open a shop card */}
      <Grid item container direction="column" style={{ marginTop: "2em" }}>
        <OpenShop languageJson={t} />
      </Grid>
      <Grid item>
        <Footer {...props} languageJson={t} />
      </Grid>
    </Grid>
  );
}
