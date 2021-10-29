import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountryList = ({countriesFiltered}) => {
  if (countriesFiltered.length > 10) {
    return <p>Too many matches</p>
  }

  if (countriesFiltered.length === 1) {
    return countriesFiltered.map((country) => (
      <div key={country.cca2}> 
        <h1>{country.name.common}</h1>
        <p>{country.capital}</p> 
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>{Object.values(country.languages).map((language) => {
          return <li>{language}</li>
        })}</ul> 
        <img src={country.flags.png} alt={country.name.official} />
      </div>
    ))
  }

  return countriesFiltered.map((country) => {
    return <p key={country.cca2}>{country.name.common}</p>
  })
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
      })
  }, [])

  const handleSearch = (event) =>
  {
    const finalSearch = event.target.value;

    setSearch(finalSearch);
    const countriesFiltered = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(finalSearch.toLowerCase())
    })
    setCountriesFiltered(countriesFiltered);
  }


  return (
    <div className="App">
      find countries:
      <input type='text' onChange={handleSearch} value={search}/>
      <CountryList countriesFiltered={countriesFiltered} />
    </div>
  );
}

export default App;
