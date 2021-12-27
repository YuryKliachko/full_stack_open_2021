class PersonNotFound extends Error {
    constructor(personName: string) {
        super(`Person ${personName} is not found in the phonebook`);
        Object.setPrototypeOf(this, PersonNotFound.prototype);
    }    
}

export default PersonNotFound
