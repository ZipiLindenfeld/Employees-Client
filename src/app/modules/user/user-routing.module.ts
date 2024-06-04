import { Route, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { RegisterComponent } from "./register/register.component";


const APP_ROUTES: Route[] = [
    { path: "login", component: LoginComponent },
    { path: "logout", component: LoginComponent },
    { path: "register", component: RegisterComponent }

]

@NgModule({
    imports: [RouterModule.forChild(APP_ROUTES)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}