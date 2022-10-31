"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonsService = void 0;
const common_1 = require("@nestjs/common");
let PersonsService = class PersonsService {
    constructor() {
        this.persons = [
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
        ];
    }
    getAll() {
        return this.persons;
    }
    create(person) {
        this.persons = [...this.persons, person];
    }
};
PersonsService = __decorate([
    (0, common_1.Injectable)()
], PersonsService);
exports.PersonsService = PersonsService;
//# sourceMappingURL=persons.service.js.map