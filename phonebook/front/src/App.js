import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Filter = ({ newFilter, handleNewFilter }) => {
  return (
    <p>
      filter shown with <input value={newFilter} onChange={handleNewFilter} />
    </p>
  )
}

const PersonForm = ({ addPerson, newName, newNumber, handleNewName, handleNewNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const DisplayInfos = ({ person, deleteUser }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={deleteUser} > delete </button>
    </div>
  )
}

const Persons = ({ persons, deleteUser }) => {
  return (
    <div>
      {
        persons.map(person =>
          <DisplayInfos
            key={person.name}
            person={person}
            deleteUser={() => deleteUser(person.id)}
          />
        )
      }
    </div>
  )
}

const Alert = ({ msg }) => {
  if (msg.msg === null)
    return null

  return (
    <div className={msg.type}>
      {msg.msg}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewfilter] = useState('')
  const [msg, setMsg] = useState({msg: null, type: ''})

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }
  useEffect(hook, [])

  const deleteUser = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`) === true) {
      personService
        .remove(id)
        .then(data => {
          console.log(data)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const person = persons.find(person => person.name === newName)

    if (person) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one ?`)
        === true) {
        personService
          .update(person.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
            const msg = { msg : `Added ${newName}`, type: 'confirm'}
            setMsg(msg)
            setTimeout(() => {
              setMsg({...msg, msg: null})
            }, 5000)
          })
          .catch(error => {
            const msg = { 
              msg: `Information of ${person.name} has already been removed from server`,
              type: 'error'
            }
            setMsg(msg)
            setTimeout(() => {
              setMsg({...msg, msg: null})
            }, 5000)
          })
      }
    }
    else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewfilter(event.target.value)
  }

  const show = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Alert msg={msg} type={'confirm'} />

      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />

      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber} />

      <h2>Numbers</h2>
      <Persons persons={show} deleteUser={deleteUser} />

    </div>
  )
}

export default App