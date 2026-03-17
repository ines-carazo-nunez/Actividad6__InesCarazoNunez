import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
 userForm: FormGroup

 constructor() {
    this.userForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required
      ]),
      apellido: new FormControl("", [
        Validators.required,
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\w+\@[a-zA-Z_]+?\.[a-zA-Z_]{2,3}/)
      ]),
      image: new FormControl("", [
        Validators.required
      ]),
    }, [])
  }

checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched
  }

  getDataForm() {
    console.log(this.userForm.value);
    this.userForm.reset()

  }
}
