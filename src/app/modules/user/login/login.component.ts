import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { RoleService } from '../../employee/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  hide: boolean = true;
  loginForm!: FormGroup;
  user: User;

  constructor(private _userService: UserService, private router: Router, private _roleService: RoleService, private _acr: ActivatedRoute) {
    this.user = new User();
    this.loginForm = new FormGroup({
      userName: new FormControl(this.user.userName, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit(): void {
    this._acr.paramMap.subscribe(paramMap => {
      if (paramMap)
        if (paramMap.has("isLogout")) {
          if (paramMap.get("isLogout"))
            localStorage.removeItem('userToken');
        }
    });
  }
  loginUser() {
    this.user = this.loginForm.value;
    this._userService.loginUser(this.user).subscribe(data => {
      localStorage?.setItem('userToken', 'Bearer ' + data.token)
      Swal.fire({
        title: 'welcome!!!'
      })
      this.router.navigate(['employee/allEmployees'])
    }
    )
  }
}
