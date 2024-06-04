import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {

  private employeesUrl = 'https://localhost:7213/api/Employee';
  token;
  header;
  constructor(private http: HttpClient) {

  }
  initTokenAndHeader() {
      this.token = localStorage?.getItem('userToken');
      this.header = new HttpHeaders().set('Authorization', this.token);
  }

  getEmployees(): Observable<Employee[]> {
    this.initTokenAndHeader();
    return this.http.get<Employee[]>(this.employeesUrl, { 'headers': this.header });
  }

  getEmployeeById(id: number): Observable<Employee> {
    this.initTokenAndHeader()
    return this.http.get<Employee>(`${this.employeesUrl}/${id}`, { 'headers': this.header });
  }

  addEmployee(employee: any): Observable<Employee> {
    this.initTokenAndHeader()
    if (employee != undefined) {
      employee.gender = +employee.gender;
      for (let role of employee.roles)
        role.roleId = +role.roleId;
      employee.roles = employee.roles.filter(r => r.roleId != undefined && !Number.isNaN(r.roleId))
    }
    return this.http.post<Employee>(this.employeesUrl, employee, { 'headers': this.header });
  }

  updateEmployee(id: number, employee: any): Observable<Employee> {
    this.initTokenAndHeader();
    return this.http.put<Employee>(`${this.employeesUrl}/${id}`, employee, { 'headers': this.header });
  }

  deleteEmployee(id: number): Observable<any> {
    this.initTokenAndHeader()
    return this.http.delete(`${this.employeesUrl}/${id}`, { 'headers': this.header });
  }
}