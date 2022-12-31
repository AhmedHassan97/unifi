import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React from "react";
import WeatherList from "../components/weatherLits";

export default function WeatherPage() {
  const [weatherData, setWeatherData] = React.useState();

  const fetchWeather = async (position: GeolocationPosition) => {
    const weatherApiConstruct = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.latitude}&cnt=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
    const response = await axios.get(weatherApiConstruct);
    setWeatherData(response.data.list);
  };
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (position) {
        fetchWeather(position);
      }
    });
  }, []);
  return (
    <Box>
      {weatherData && <WeatherList weather={weatherData as Array<{}>} />}
    </Box>
  );
}
