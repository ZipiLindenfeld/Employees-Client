import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: "user", loadChildren: () => import("../../modules/user/user.module").then(u => u.UserModule) },
    { path: "employee", loadChildren: () => import("../../modules/employee/employee.module").then(u => u.EmployeeModule) }
]