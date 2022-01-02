import { useState } from "react"
import PersonNotFound from "../errors"
import { Person } from "../interfaces"
import personsService from '../services/persons'

const PersonForm = ({ persons, setPersons, showNotification }: { persons: Person[], setPersons: Function, showNotification: Function }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const updatePersonsList = (persons: Person[]) => {
        setPersons(persons)
        setNewName('')
        setNewNumber('')
    }

    const addPersonHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (newNumber === '') {
            window.alert('Please, enter a phone number to save a person to the phonebook')
            return
        }

        const existingPerson = persons.find((person: Person) => person.name === newName)
        if (existingPerson) {
            const updatePersonData = window.confirm(`${newName} already exists in the phonebook. Do want to update their data?`)
            if (!updatePersonData) return
            personsService.updatePerson({ ...existingPerson, name: newName, number: newNumber })
            .then(() => {
                personsService.getPersonsList()
                    .then((personsList: Person[]) => {
                        updatePersonsList(personsList)
                        showNotification(`Phone number for person ${existingPerson.name} has been updated`, false)
                    })
            })
            .catch((error) => {
                console.log(error)
                showNotification(error.response.data, true)
                personsService.getPersonsList().then((personsList: Person[]) => updatePersonsList(personsList))
            })
            return
        }

        personsService.addPerson({ name: newName, number: newNumber })
            .then(() => {
                personsService.getPersonsList().then((personsList: Person[]) => updatePersonsList(personsList))
                showNotification('Person has been added to the phonebook', false)
            })
            .catch(error => {
                console.log(error)
                showNotification(error.response.data, true)
                personsService.getPersonsList().then((personsList: Person[]) => updatePersonsList(personsList))

            })

    }

    const handleFormChange = (stateSetter: Function, event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        stateSetter(event.target.value)
    }

    const areFormsFilledIn = (): boolean => {
        return [newName, newNumber].every((form: string) => form !== '')
    }

    return (
        <form onSubmit={addPersonHandler}>
            <div>
                name: <input value={newName} onChange={(event) => handleFormChange(setNewName, event)} />
            </div>
            <div>number: <input value={newNumber} onChange={(event) => handleFormChange(setNewNumber, event)} /></div>
            <div>
                <button type="submit" disabled={!areFormsFilledIn()} >add</button>
            </div>
        </form>
    )
}

export default PersonForm
