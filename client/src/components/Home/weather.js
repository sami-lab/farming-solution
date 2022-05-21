import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactWeather, { useOpenWeather } from "react-open-weather";

export default function Weather() {
  const [locData, setLocData] = useState();

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
  return (
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
  );
}
