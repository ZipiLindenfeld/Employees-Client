import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { Employee } from '../../modules/employee/employee.model';
import { EmployeeService } from '../../modules/employee/employee.service';
import { Role } from '../../modules/employee/role.model';
import { RoleService } from '../../modules/employee/role.service';
import { UserService } from '../../modules/user/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeModule } from '../../modules/employee/employee.module';
import { AddEmployeeComponent } from '../../modules/employee/add-employee/add-employee.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [],
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule, EmployeeModule, MatFormFieldModule, MatIconModule],

})
export class HeaderComponent {
  title = 'EmployeesApplication';
  roles: Role[];
  emp: Employee;

  constructor(
    private dialog: MatDialog,
    private _roleService: RoleService,
    private _userService: UserService,
    private _employeeService: EmployeeService,
    private router: Router,
    private _acr: ActivatedRoute
  ) { }

  connected() {
    return localStorage?.getItem('userToken') != null;
  }
  login() {
    this.router.navigate(['/user/login', { isLogout: true }]);
  }
  logout() {
    if (typeof window !== undefined) {
      Swal.fire({
        title: 'Are you sure you want to log out?',
        text: 'You are about to log out this application!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log out!',
        cancelButtonText: 'No, I want to stay!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/user/logout', { isLogout: true }]);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.router.navigate(['employee/allEmployees']);
        }
      });
    }
  }
  register() {
    Swal.fire({
      title: 'Enter password!',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      confirmButtonText: 'ok',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      this._userService.checkPassword(result.value).subscribe((data) => {
        if (!data) {
          Swal.fire({
            title: `wrong password: ${result.value}`,
          });
        } else {
          this.router.navigate(['user/register']);
        }
      });
    });
  }
  addEmployee() {
    this.emp = new Employee();
    this._roleService.getRoles().subscribe((data) => {
      this.roles = data;
      const dialogRef = this.dialog.open(AddEmployeeComponent, {
        width: '1000px',
        data: { emp: this.emp, roles: this.roles },
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);

        if (result != undefined) {
          this._employeeService.addEmployee(result).subscribe((data) => {
            Swal.fire({
              title: `Well done!!! `,
              text: 'The employee was successfully added!',
              icon: 'success',
            });
          });
        }
      });
    });
  }
}
