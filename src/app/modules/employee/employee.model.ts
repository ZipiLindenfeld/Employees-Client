import { EmployeeRole } from "./employee-role.model";

export class Employee {
    id: number;
    employeeIdentification: string;
    firstName: string;
    lastName: string;
    startDate: Date;
    birthDate: Date;
    gender: Gender;
    status: boolean;
    roles:EmployeeRole[]=[];
}

export enum Gender {
    Male = 'Male',
    Female = 'Female'
}