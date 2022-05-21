import React, { useState, useEffect } from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

import PropTypes from "prop-types";
import Head from "next/head";
import NProgress from "nprogress";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { validateToken } from "../api/authentication/login";
import { getRecentProducts } from "../api/product/product";
import Loading from "../src/resusable/spinner";

const sampleCategories = [
  {
    name: "Graphics",
    title: "Vector Graphics",
    heading: "Custom-Designed Graphics",
    details:
      "Explore more than 1,300,000 graphics to use for social media, e-commerce, cards, and webpages. These graphics sets feature apparel mockups, logos, icons, and themed graphic elements for web and print projects of all kinds.",
    image: "/products/vector-graphics.png",
  },
  {
    name: "Fonts",
    title: "Display Fonts",
    heading: "Stunning Fonts",
    details:
      "Browse over 45,000 fonts to download and use in design projects of all kinds for web and print. These font sets feature hand-drawn, brush, and vector letterforms, along with extra character sets and embellishments for headers, text, and display.",
    image: "/products/display-fonts.png",
  },
  {
    name: "Templates",
    title: "Canva Templates",
    heading: "Creative Templates",
    details:
      "Explore over 370,000 templates to use for designing resumes, business cards, and presentations in Word, PowerPoint, Keynote and more. Choose templates for infographics, webpages, logos, online stores and more.",
    image: "/products/canva-templates.png",
  },
  {
    name: "Add-ons",
    title: "Unique Add-Ons",
    heading: "Unique Add-Ons",
    details:
      "Explore over 26,000 add-ons to create special effects and increase visual interest in design projects of all kinds. These add-on sets and bundles include presets, layer styles and effects, retouching kits, brushes and more for design software such as Lightroom, Photoshop, and Illustrator.",
    image: "/products/instagram-templates.png",
  },
  {
    name: "Photos",
    title: "Stock Photos",
    heading: "High-Quality Stock Photos",
    details:
      "Browse over 3,450,000 photos to use for book covers, posters, and cards. Featuring high-resolution images of people, places, animals, and objects, this collection of photographs creates eye-catching backgrounds for design projects of all kinds.",
    image: "/products/product-mockups.png",
  },
  {
    name: "Web Themes",
    title: "Shopify Themes",
    heading: "Creative Web Themes",
    details:
      "Browse over 8,100 themes for business and personal websites, landing pages, and blogs. These modern, feminine, and professional themes can power e-commerce sites, portfolios, and blogging platforms.",
    image: "/products/shopify-themes.png",
  },
  {
    name: "3D",
    title: "3D Models",
    heading: "3D Models",
    details:
      "Find more than 6,400 3D models to download and use in all kinds of design projects. These 3D assets include tileable textures, animated models, architecture, and landscapes in a variety of low and high-poly styles.",
    image: "/products/shopify-themes.png",
  },
];
export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [language, setLanuage] = useState("english");
  const [languageJson, setLanuageJson] = useState(
    require("../src/languages/english.json")
  );
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  useEffect(() => {
    const fetchToken = async () => {
      setLoadingAuth(true);
      let Token = null;
      try {
        Token = await localStorage.getItem("farmingToken");
      } catch (e) {
        console.log("Error Fetching Token");
        setLoadingAuth(false);
      }

      if (Token != null) {
        //validate Token Here from server or async storage to find user state
        //validating through server
        try {
          const response = await validateToken(Token);
          let result = await response.json();
          if (result.data?.user !== null) {
            setUserToken(Token);
            setUser(result.data.user);
          }
          setLoadingAuth(false);
        } catch (e) {
          setLoadingAuth(false);
        }
      } else {
        setLoadingAuth(false);
      }
    };
    fetchToken();
  }, []);
  const getProducts = async () => {
    try {
      let response = await getRecentProducts();
      let result = await response.json();
      if (result.status === "success") {
        setCategories(
          result.data.categories.map((c) => {
            c.image = publicRuntimeConfig.backend + "/files/" + c.image;
            return c;
          })
        );
        setProducts(result.data.products);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  React.useEffect(() => {
    if (language) {
      const lang = require(`../src/languages/${language}.json`);
      setLanuageJson(lang);
    }
  }, [language]);

  Router.onRouteChangeStart = (url) => {
    NProgress.start();
  };
  Router.onRouteChangeComplete = () => NProgress.done();
  Router.onRouteChangeError = () => NProgress.done();

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {loadingAuth ? (
          <Loading />
        ) : (
          <Component
            {...pageProps}
            user={user}
            setUser={setUser}
            userToken={userToken}
            setUserToken={setUserToken}
            categories={categories}
            language={language}
            setLanuage={setLanuage}
            languageJson={languageJson}
            products={products}
          />
        )}
      </ThemeProvider>
      <style jsx>{`
        @font-face {
          font-family: "Averta";
          src: url("/fonts/AvertaDemoPECuttedDemo-Regular.otf");
          font-style: normal;
          font-weight: 400;
          font-display: swap;
        }

        @font-face {
          font-family: "Averta Bold";
          src: url("/fonts/AvertaDemoPE-ExtraBold.otf");
          font-style: normal;
          font-weight: 400;
          font-display: swap;
        }
      `}</style>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
