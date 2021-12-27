import { Person } from "../interfaces"
import PersonInfo from "./PersonInfo"

const Persons = ({ persons, setPersons, searchName, showNotification }: { persons: Person[], setPersons: Function, searchName: string, showNotification: Function }) => {
    let displayedPersons: Person[]
    if (!searchName) {
        displayedPersons = persons
    } else {
        displayedPersons = persons.filter((person: Person) => person.name.toLocaleLowerCase().startsWith(searchName))
    }
    return (
        <div>
            {displayedPersons.map((person: Person) => { return <PersonInfo key={person.id} person={person} setPersons={setPersons} showNotification={showNotification} /> })}
        </div>
    )
}

export default Persons
