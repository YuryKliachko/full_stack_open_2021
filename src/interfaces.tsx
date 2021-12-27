interface Person {
    id: number;
    name: string;
    number: string;
}

interface NewPerson extends Omit<Person, 'id'> {}

interface Message {
    text: string;
    isError: boolean
}

export type {Person, NewPerson, Message}
