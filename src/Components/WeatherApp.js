import React, { useState, useEffect } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Nagpur");

  useEffect( () => {
    const fetchApi= async () => {
        const url =  `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=e777c7197894c7f37c2846a831f411dc`;

        const response = await fetch(url);
        const resp = await response.json();
        setCity(resp);

        console.log(resp);
        
      };
    fetchApi();
},[search]);

    return (
        <div>
                    <div className="inputData">
                        <input type="search" 
                        className="inputSearch" 
                        value={search}
                        onChange={(event)=>{ setSearch(event.target.value)}} />
                    </div>

                {!city ? (<p>No data Found ji</p>) : (
                    <div className="data">
                        <h2>Weather in {search}</h2>
                        <p>Temperature: {city.main.temp}°C</p>
                        <p>Minimum Temperature: {city.main.temp_min}°C</p>
                        <p>Maximum Temperature: {city.main.temp_max}°C</p>
                        <p>Humidity: {city.main.humidity}</p>
                        <p>Country Code: {city.sys.country}</p>
                        <p>Description: {city.weather[0].description}</p>
                    </div>
                 )} 
        </div>
 )};
