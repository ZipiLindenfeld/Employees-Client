import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AllEmployeesComponent } from "./all-employees/all-employees.component";

const APP_ROUTES: Route[] = [
    { path: "allEmployees", component: AllEmployeesComponent },
]

@NgModule({
    imports: [RouterModule.forChild(APP_ROUTES)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule {

}