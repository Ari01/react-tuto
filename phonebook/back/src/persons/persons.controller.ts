import { Controller, Get, Post, Body } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { Person } from './interfaces/interface';

@Controller('persons')
export class PersonsController {
    constructor(private readonly personService: PersonsService) {}

    @Get()
    async getAll(): Promise<Person[]> {
        return this.personService.getAll();
    }

    @Post()
    async create(@Body() newPerson: Person) {
        return this.personService.create(newPerson);
    }
}
