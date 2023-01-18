import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherApp() {
  const [city, setCity] = useState("Nagpur");
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchApi();
};
const handleChange = (event) => {
    setCity(event.target.value);
    setError(null);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = () => {
    axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=7700d2842cebea400b6af27412b98602`
      )
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError("Data Not Found");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleChange} />
        <button type="submit">search</button>
      </form>

      {error ? ( <h1>{error}</h1>):
      ( weatherData.main && (
          <div className="data">
            <h2>Weather in {city}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Minimum Temperature: {weatherData.main.temp_min}°C</p>
            <p>Maximum Temperature: {weatherData.main.temp_max}°C</p>
            <p>Humidity: {weatherData.main.humidity}</p>
            <p>Country Code: {weatherData.sys.country}</p>
            <p>Description: {weatherData.weather[0].description}</p>
          </div>
        )
      )}
    </div>
  );
}
