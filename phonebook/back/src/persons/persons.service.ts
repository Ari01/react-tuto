import { Injectable } from '@nestjs/common';
import { Person } from './interfaces/interface';

@Injectable()
export class PersonsService {
    persons: Person[] = [
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
        },
        {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
        },
        {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
        }
    ]

    getAll(): Person[] {
        return this.persons;
    }

    create(person: Person) {
        this.persons.push(person)
    }
}
