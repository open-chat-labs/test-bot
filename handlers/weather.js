module.exports = async ({ body }, res) => {
  const [param] = body;
  const city = param.value;
  const WEATHER_KEY = process.env.WEATHER_KEY;
  const WEATHERAPI_BASE_URL = "https://api.weatherapi.com/v1/current.json";

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    const response = await fetch(
      `${WEATHERAPI_BASE_URL}?key=${WEATHER_KEY}&q=${encodeURIComponent(city)}`
    );
    const weatherData = await response.json();

    if (weatherData.error) {
      return res.status(404).json({ error: weatherData.error.message });
    }

    console.log("Weather data retrieved: ", weatherData);

    return res.status(200).json(weatherData);
  } catch (error) {
    console.error("Error getting weather data: ", error);
    return res
      .status(500)
      .json({ error: `Error getting the weather: ${error.message}` });
  }
};
