import React, { useState, useEffect } from "react";
import axios from "axios";
import Time from "./Time";

export default function WeatherApp() {
  const [city, setCity] = useState("Nagpur");
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    fetchApi();
  };
const handleChange = (event) => {
    setCity(event.target.value);
    // console.log(event.target.value);
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
        // console.log(response.data);
      })
      .catch((error) => {
        setError("Data Not Found");
      });
  };
  const handelEnter=()=>{
    handleSubmit();
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleChange} onKeyUp={handelEnter}/>
        <button type="submit">Search</button>
      </form>

      {error ? ( <h1>{error}</h1>):
      ( weatherData.main && (
        <div className="data">

            <h2>{weatherData.sys.country}, {city}</h2>
            <h3><Time/></h3>
            <div className="wicon">
               <img  id="icon"  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} alt="weather icon"></img>
            </div>
            <p className="temperature">{weatherData.main.temp}°<span>C</span></p>
            <p className="description">{weatherData.weather[0].description}</p>
            
            <div className="minmax">
              <p>Min: {weatherData.main.temp_min}<span>°C</span></p>
              <p>Max: {weatherData.main.temp_max}<span>°C</span></p>
            </div>

            <p>Humidity: {weatherData.main.humidity}</p>

        </div>
        )
      )}
    </div>
  );
}

// prajwal ramteke