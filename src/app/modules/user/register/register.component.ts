import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide: boolean = true;
  user: User;
  registerForm!: FormGroup;
  constructor(private _userService: UserService, private router: Router) {
    this.user = new User();
    this.registerForm = new FormGroup({
      userName: new FormControl(this.user.userName, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(3)]),
    });
  }

  registerUser() {
    this.user = this.registerForm.value;
    this._userService.addUser(this.user).subscribe(() =>
      Swal.fire({
        title: this.user.userName + ' added successfully!'
      }))
    this.router.navigate(['employee/allEmployees'])
  }
}