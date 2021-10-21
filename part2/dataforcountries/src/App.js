import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [all, setAll] = useState([]);

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setAll(response.data)
      })
  }, [])

  return (
    <div className="App">
      countries:
      <input type='text'/>
    </div>
  );
}

export default App;
