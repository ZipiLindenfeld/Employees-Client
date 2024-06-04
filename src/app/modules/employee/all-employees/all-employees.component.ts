import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee, Gender } from '../employee.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { EmployeeRole } from '../employee-role.model';
import { RoleService } from '../role.service';
import { Role } from '../role.model';
import { EmployeeDetailesComponent } from '../employee-detailes/employee-detailes.component';
import { AddRoleComponent } from '../add-role/add-role.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss']
})
export class AllEmployeesComponent {

  employees: Employee[];
  allEmployees: Employee[];
  roles: Role[];
  empRoles: EmployeeRole[];
  pattern = "";

  constructor(
    private _employeeService: EmployeeService,
    private _roleService: RoleService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this._roleService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  ngOnInit() {
    this._employeeService.getEmployees().subscribe(data => {
      this.allEmployees = data;
      this.change();
    });
  }

  sortEmployeesByName(): Employee[] {
    return this.employees?.sort((a, b) => {
      if (a.lastName < b.lastName) return -1;
      if (a.lastName > b.lastName) return 1;
      if (a.firstName < b.firstName) return -1;
      if (a.firstName > b.firstName) return 1;
      return 0;
    });
  }

  openShowDetailsEmployeeDialog(emp: Employee): void {
    this.dialog.open(EmployeeDetailesComponent, {
      width: '600px',
      data: emp
    });
  }

  openAddEmployeeDialog(emp: Employee): void {
    if (emp == null) {
      emp = new Employee();
    }
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '1000px',
      height: '600px',
      data: { emp: emp, roles: this.roles }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this._employeeService.updateEmployee(result.id, result).subscribe(data => {
          Swal.fire({
            title: `Well done!!! `,
            text: "The employee updated successfully!",
            icon: "success"
          });
          this._employeeService.getEmployees().subscribe(data => {
            this.allEmployees = data;
            this.change();
          });
        });
      }
    });
  }

  addRole() {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: 'fit-content',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._roleService.addRole(result).subscribe(() => {
          Swal.fire({
            title: `Well done!!! `,
            text: "The role added successfully!",
            icon: "success"
          });
          this._roleService.getRoles().subscribe(data => {
            this.roles = data;
          });
        });
      }
    });
  }

  exportToExcel(): void {
    const employeesCopy = JSON.parse(JSON.stringify(this.employees));
    employeesCopy.forEach(employee => {
      employee.gender = employee.gender === Gender.Male ? 'Male' : 'Female';
      delete employee.roles;
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(employeesCopy, { header: ['firstName', 'lastName', 'employeeIdentification', 'startDate', 'gender'] });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, 'employees.xlsx');
  }

  editEmployee(emp: Employee) {
    this.router.navigate(['employee/editEmployee', emp]);
  }

  showDetailes(emp: Employee) {
    this.router.navigate(['employee/employeeDetailes', emp]);
  }

  change() {
    this.employees = this.allEmployees?.filter(e => e.firstName.includes(this.pattern) ||
      e.lastName.includes(this.pattern) ||
      e.employeeIdentification.includes(this.pattern) ||
      this.searchInRoles(e.roles));
    this.employees = this.sortEmployeesByName();
  }

  searchInRoles(roles: EmployeeRole[]): boolean {
    let flag: boolean = false;
    roles.forEach(r => {
      if (r.role.name.includes(this.pattern))
        flag = true;
    });
    return flag;
  }

  deleteEmployee(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this._employeeService.deleteEmployee(id).subscribe(() => {
          this._employeeService.getEmployees().subscribe(d => {
            this.allEmployees = d;
            this.change();
          });
        });
      }
    });
  }
}
