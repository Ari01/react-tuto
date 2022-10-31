import { Person } from './interfaces/interface';
export declare class PersonsService {
    persons: Person[];
    getAll(): Person[];
    create(person: Person): void;
}
