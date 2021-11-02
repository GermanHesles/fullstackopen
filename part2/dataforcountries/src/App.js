import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Languages = ({languages}) => {
  return (
    <ul>{Object.values(languages).map((language) => {
      return <li key={language}>{language}</li>
    })}</ul>
  )
}

const MatchedCountry = ({countriesFiltered}) => {
  return countriesFiltered.map((country) => (
    <div key={country.cca2}> 
      <h1>{country.name.common}</h1>
      <p>{country.capital}</p> 
      <p>population {country.population}</p>
      <h3>languages</h3>
      <Languages languages={country.languages} /> 
      <img src={country.flags.png} alt={country.name.official} />
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
      })
  }, [])

  const filterSearch = (searchedCountry) => {
    const countriesFiltered = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
    })

    setCountriesFiltered(countriesFiltered);
  }

  const handleSearch = (event) =>
  {
    const country = event.target.value;
    filterSearch(country)
    setSearch(country);
  }

  const CountryList = ({countriesFiltered}) => {
    if (countriesFiltered.length > 10) {
      return <p>Too many matches</p>
    }
  
    if (countriesFiltered.length === 1) {
      return <MatchedCountry countriesFiltered={countriesFiltered} />
    }
  
    return countriesFiltered.map((country) => {
      return (
        <p key={country.cca2}>
          {country.name.common} <button name='button' onClick={() => {filterSearch(country.name.common)}}>show</button>
        </p>
      )
    })
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
