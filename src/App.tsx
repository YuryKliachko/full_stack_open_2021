import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import { Person, Message } from './interfaces'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState<Message>({text: '', isError: false})

  const getPersonsHook = () => {
    console.log('Requesting persons ...')
    personsService.getPersonsList().then((persons: Person[]) => setPersons(persons))
  }
  useEffect(getPersonsHook, [])

  const showNotification = (message: string, isError: boolean) => {
    setNotification({text: message, isError})
    setTimeout(() => {
      setNotification({text: '', isError: false})
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Filter searchName={searchName} setSearchName={setSearchName} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} showNotification={showNotification} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} searchName={searchName} showNotification={showNotification} />
    </div>
  )
}

export default App
