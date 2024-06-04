import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { EmployeeService } from "./employee.service";
import { RoleService } from "./role.service";
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MatRadioModule } from '@angular/material/radio';
import { EmployeeDetailesComponent } from "./employee-detailes/employee-detailes.component";
import { AddRoleComponent } from "./add-role/add-role.component";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatGridListModule } from "@angular/material/grid-list";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";

@NgModule({
    declarations: [AllEmployeesComponent, EmployeeDetailesComponent, AddRoleComponent, AddEmployeeComponent],
    imports: [EmployeeRoutingModule, HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, MatGridListModule],
    providers: [RoleService, EmployeeService],
    exports: []
})
export class EmployeeModule { }
