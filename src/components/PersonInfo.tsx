import {Person} from "../interfaces"
import personService from '../services/persons'

const PersonInfo = ({person, setPersons, showNotification}: {person: Person, setPersons: Function, showNotification: Function}) => {
    const deleteHandler = () => {
        const userChoice = window.confirm('Are you sure you want to delete this person?')
        if (!userChoice) return
        personService.deletePerson(person).then(() => {
            personService.getPersonsList().then((newPersonsList: Person[]) => setPersons(newPersonsList))
            showNotification(`Person ${person.name} had been deleted from the phonebook`, false)
        })
    }
    return <p key={person.id}>{person.name} {person.number} <button onClick={deleteHandler}>delete</button></p>
}

export default PersonInfo
