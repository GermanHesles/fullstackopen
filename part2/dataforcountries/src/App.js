import React, { useState, useEffect } from 'react'
import axios from 'axios'


const WeatherCountry = ({country}) => {

  const [weatherCountries, setWeatherCountries] = useState([]);

  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=a96e48df4164aa3d8f1d2529034d5aa3&query=${country.capital}`)
      .then(response => {
        console.log(response.data)
        setWeatherCountries(response.data)
      });
  },[country.capital]);

  if (!weatherCountries.current) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <b>temperature:</b> {weatherCountries.current.temperature}<br />
      <img src={weatherCountries.current.weather_icons[0]} alt={weatherCountries.current.weather_descriptions[0]} /><br />
      <b>wind:</b> {weatherCountries.current.wind_speed}
    </div>
  )
}

const Languages = ({languages}) => {
  return (
    <ul>{Object.values(languages).map((language) => {
      return <li key={language}>{language}</li>
    })}</ul>
  )
}

const MatchedCountry = ({countriesFiltered, setWeatherCountries}) => {
  return countriesFiltered.map((country) => (
    <div key={country.cca2}> 
      <h1>{country.name.common}</h1>
      <p>{country.capital}</p> 
      <p>population {country.population}</p>
      <h3>languages</h3>
      <Languages languages={country.languages} /> 
      <img src={country.flags.png} alt={country.name.official} />
      <WeatherCountry setWeatherCountries={setWeatherCountries} country={country}/>
    </div>
  ))
}
   
function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      });
  }, []);

  const filterSearch = (searchedCountry) => {
    const countriesFiltered = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
    });

    setCountriesFiltered(countriesFiltered);
  };

  const handleSearch = (event) =>
  {
    const country = event.target.value;
    filterSearch(country)
    setSearch(country);
  };

  const CountryList = ({countriesFiltered}) => {
    if (countriesFiltered.length > 10) {
      return <p>Too many matches</p>
    };
  
    if (countriesFiltered.length === 1) {
      return <MatchedCountry countriesFiltered={countriesFiltered} />
    };
  
    return countriesFiltered.map((country) => {
      return (
        <p key={country.cca2}>
          {country.name.common} <button name='button' onClick={() => {filterSearch(country.name.common)}}>show</button>
        </p>
      )
    });
  };

  return (
    <div className="App">
      find countries:
      <input type='text' onChange={handleSearch} value={search}/>
      <CountryList countriesFiltered={countriesFiltered} />
    </div>
  );
};

export default App;
