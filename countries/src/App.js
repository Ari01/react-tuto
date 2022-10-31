import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ newFilter, handleFilter }) => {
  return (
    <p>
      find countries <input value={newFilter} onChange={handleFilter} />
    </p>
  )
}

const ShowView = ({ item }) => {
  return (
    <div>
      <h1> {item.name.common} </h1>
      <p> capital {item.capital} </p>
      <p> area {item.area}</p>
      <h2> languages: </h2>
      <ul>
        {Object.entries(item.languages).map(i =>
          <li key={i}> {(Object.entries(i)[1][1])} </li>)}
      </ul>
      <img src={item.flags.png} id='flag' />
    </div>
  )
}

const ShowInfos = ({ newFilter, countries, clicked, setClicked }) => {
  console.log(countries)
  console.log('filter in showInfos', newFilter)
  console.log('clicked', clicked)

  if (newFilter) {
    const show = countries.filter(country => country.name.common.includes(newFilter))
    console.log('show = ', show)

    if (show.length === 1) {
      console.log('lang', show[0].languages)
      return (
        <ShowView item={show[0]} />
      )
    }
    if (show.length > 0 && show.length <= 10) {
      console.log('match found')

      return (
        <div>
          {show.map(country =>
            <div key={country.name.common}>
              {`${country.name.common} `}
              <button onClick={() => {
                clicked.includes(country.name.common)
                  ? setClicked(clicked.filter(tmp => tmp !== country.name.common))
                  : setClicked(clicked.concat(country.name.common))
              }} >
                show
              </button>
              {
                clicked.includes(country.name.common)
                  ? <ShowView item={country} />
                  : <br />
              }
            </div>)
          }
        </div>
      )
    }
    else {
      console.log('too many entries')
      return (
        <p>
          Too many matches, specify another filter
        </p>
      )
    }
  }
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [clicked, setClicked] = useState([])

  const handleFilter = (event) => {
    console.log('event target value', event.target.value)
    setNewFilter(event.target.value)
  }

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <ShowInfos newFilter={newFilter} countries={countries} clicked={clicked} setClicked={setClicked} />
    </div>
  )
}

export default App;
