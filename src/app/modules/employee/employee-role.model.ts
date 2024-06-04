import { Role } from './role.model'
import { Employee } from './employee.model';

export class EmployeeRole {
  roleId: number;
  role: Role;
  employeeId: number;
  employee: Employee;
  startDate: Date;
  constructor(role: Role=null) {
    this.role = role;
    this.startDate = new Date();
    this.roleId = this.role.id;
  }
}