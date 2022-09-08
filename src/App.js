import "./App.css";
import { useState } from "react";
import React from "react";

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        if(result.cod === 200){
          setWeather(result);
          setQuery('');
        } else {
          setQuery('');
        }
      });
    }
  }
  
  const api = {
    key: "f2d983ead225e619d8902bff978ed2da",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  
  const datebuilder = () => {
    let date = String(new window.Date());
    date = date.slice(0, 15);
    return date;
  };

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ?
    'warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar" 
          placeholder="Search..." 
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className="location-box">
              <div className="location"> {weather.name}, {weather.sys.country} </div>
              <div className="date"> {datebuilder()} </div>
            </div>
          <div className="weather-box">
            <div className="temp"> {`${Math.floor(weather.main.temp)}°C`} </div>
            <div className="weather"> {weather.weather[0].main} </div>
            <div className="weather"> {weather.wind.speed + ' mph'} </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
