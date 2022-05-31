import {
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
} from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import ReactWeather, { useOpenWeather } from "react-open-weather";
import cities from "./cities.json";
export default function Weather() {
  const [locData, setLocData] = useState();
  //const [city, setCity] = useState("");

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchLocation = () => {
    fetch("https://api.ipregistry.co/?key=wmz3h4w5kfomh9kb")
      .then(function (response) {
        return response.json();
      })
      .then(function (payload) {
        setLocData(payload.location);
      })
      .catch((err) => {
        console.log(err);
        setLocData({
          city: "Karachi",
          continent: { code: "AS", name: "Asia" },
          country: {
            area: 803940,
            calling_code: "92",
            capital: "Islamabad",
            code: "PK",
          },
          in_eu: false,
          language: { code: "ur", name: "Urdu", native: "اردو" },
          latitude: 24.90562,
          longitude: 67.08225,
          postal: "75300",
          region: { code: "PK-SD", name: "Sindh" },
        });
        //setUserCountry(countriesData.find((x) => x.code === "GB"));
      });
  };
  useEffect(() => {
    fetchLocation();
  }, []);

  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "6e5445872f13cafaaeee8356985ba9b1",
    lat: locData?.latitude,
    lon: locData?.longitude,
    lang: "en",
    unit: "metric", // values are (metric, standard, imperial)
  });

  if (!locData) {
    return (
      <div style={{ height: "20vh" }}>
        <CircularProgress />
      </div>
    );
  }

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    limit: 500,
  });

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item md={6} xs={12}>
        <Grid
          container
          direction="column"
          alignItems={matchesSM ? "center" : "flex-start"}
          justifyContent={matchesSM ? "center" : "flex-start"}
          spacing={2}
        >
          {/* For text  */}
          <Grid item>
            <Typography variant="h1" align={matchesSM ? "center" : "left"}>
              Live Weather Update
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h2" align={matchesSM ? "center" : "left"}>
              {locData.city}, {locData.country.name} Weather
            </Typography>
          </Grid>
          <Grid item style={{ marginBottom: matchesSM ? "1em" : 0 }}>
            <Autocomplete
              id="location"
              filterOptions={filterOptions}
              onChange={(event, newValue) => {
                setLocData({
                  city: newValue.name,
                  latitude: newValue?.lat,
                  longitude: newValue?.lng,
                  country: {
                    name: newValue.country,
                  },
                });
              }}
              //onInput={(e) => setCity(e.target.value)}
              options={cities}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="locationTextSidebar"
                  label="Cities"
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel={locData.city}
          unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
          showForecast
          theme={{}}
        />
      </Grid>
    </Grid>
  );
}
