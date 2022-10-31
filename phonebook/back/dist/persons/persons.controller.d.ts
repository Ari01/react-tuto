import { PersonsService } from './persons.service';
import { Person } from './interfaces/interface';
export declare class PersonsController {
    private readonly personService;
    constructor(personService: PersonsService);
    getAll(): Promise<Person[]>;
    create(newPerson: Person): Promise<void>;
}
