/*-- Function to fetch and process all Forecast requests --*/

import { getCoords } from "./coords";
import { calculateDateDifference } from "./date";
import { getImage } from "./image";
import { renderForecast } from "./render-table";
import { getWeather } from "./weather";

// Parse in geolocation coords
const getLocationAndWeather = async (values) => {
  let info = "";
  let image = "";

  try {
    const coords = await getCoords(values.destination);
    const totalDays = calculateDateDifference(values.toDate);
    const diffDays =
      calculateDateDifference(values.toDate, values.fromDate) + 1;

    const result = await getWeather({
      days: totalDays,
      lat: coords.lat,
      long: coords.long,
    });

    const forecast = await result.json();

    if (forecast.data && forecast.data) {
      info = renderForecast(forecast.data, totalDays - diffDays);
      image = await getImage(values.destination);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error processing requests");
  }

  return {
    info,
    image,
  };
};

export { getLocationAndWeather };