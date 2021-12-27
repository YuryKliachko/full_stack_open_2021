import axios, { Axios, AxiosError, AxiosResponse } from "axios"
import PersonNotFound from "../errors"
import {Person, NewPerson} from "../interfaces"

const DB_BASE_URL = process.env.REACT_APP_DB_BASE_URL
console.log(DB_BASE_URL)
const PERSONS_URL = `${DB_BASE_URL}/api/persons`

const getPersonsList = async (): Promise<Person[]> => {
    const response = await axios.get(PERSONS_URL)
    const personsList: Person[] = response.data
    console.log(`Received ${personsList.length} persons`)
    return personsList
}

const addPerson = async (person: NewPerson): Promise<Person> => {
    console.log('Adding new person to the list ...')
    const response = await axios.post(PERSONS_URL, person)
    console.log(response)
    return response.data
}

const deletePerson = async (person: Person) => {
    console.log(`Deleting person ${person.name} ...`)
    const url = `${PERSONS_URL}/${person.id}`
    const response = await axios.delete(url)
    console.log(response)
}

const updatePerson = async (person: Person) => {
    console.log(`Updating person ${person.name} ...`)
    const url = `${PERSONS_URL}/${person.id}`
    const response = await axios.put(url, person).catch((error: AxiosError) => {
        if (error.response && error.response.status === 404) {
            throw new PersonNotFound(person.name)
        }
    })
    console.log(response)
}

export default {
    addPerson,
    getPersonsList,
    deletePerson,
    updatePerson
}
