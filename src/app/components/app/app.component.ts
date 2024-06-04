import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { EmployeeModule } from '../../modules/employee/employee.module';
import { EmployeeRoutingModule } from '../../modules/employee/employee-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { AddEmployeeComponent } from '../../modules/employee/add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../../modules/employee/employee.model';
import { Role } from '../../modules/employee/role.model';
import { RoleService } from '../../modules/employee/role.service';
import { EmployeeService } from '../../modules/employee/employee.service';
import { Router } from '@angular/router';
import { UserService } from '../../modules/user/user.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule, EmployeeModule, MatFormFieldModule, MatIconModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [RoleService, UserService]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
  }
}
