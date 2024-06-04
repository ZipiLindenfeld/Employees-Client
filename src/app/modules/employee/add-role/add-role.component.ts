import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})
export class AddRoleComponent {
  roleForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<AddRoleComponent>) {
    this.roleForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      isManagementRole: new FormControl('', [Validators.required])
    })
  }
  add() {
    this.dialogRef.close(this.roleForm.value);
  }
}
