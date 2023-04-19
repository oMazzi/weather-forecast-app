import React from 'react';
import './App.css';
const api = {
  key: 'a2e15444083945d0a90234141231704',
  base: 'http://api.weatherapi.com/v1/current.json?key=',
};

function App() {
  const [query, setQuery] = React.useState('');
  const [weather, setWeather] = React.useState({});

  async function search(e) {
    e.preventDefault();
    const response = await fetch(`${api.base}${api.key}&q=${query}&aqi=no`);
    const json = await response.json();
    setWeather(json);
    setQuery('');
    console.log(weather);
  }

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="App">
      <main>
        <div className="searchBox">
          <form onSubmit={search}>
            <input
              type="text"
              className="searchBar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </form>
        </div>
        <div className="locationBox">
          <div className="location">
            {weather.location
              ? `${weather.location.name}, ${weather.location.country}`
              : 'Select your place'}
          </div>
        </div>
        <div className="date">{dateBuilder(new Date())}</div>
        {weather.location ? (
          <>
            <div className="weatherBox">
              <div className="temperature">{`${weather.current.temp_c}ºC`}</div>
            </div>
            <div className="weather">{weather.current.condition.text}</div>
          </>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
