import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userForm: FormGroup
  usuariosServices = inject(UsuariosService);
  id = input<string>()
  usuario = signal<IUsuario | undefined>(undefined)
  isUpdateMode: boolean = false;
  title: string = 'Nuevo'
  router = inject(Router)

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required
      ]),
      last_name: new FormControl("", [
        Validators.required,
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\S+@\S+\.\S+$/)
      ]),
      username: new FormControl("", [
        Validators.required,
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
      ]),
    }, [])
  }

  async ngOnInit() {
    // si recibimos el id estamos en actualizar y si no estamos en insertar
    if (this.id()) {
      this.title = 'Actualizar'
      //pedir los datos al servicio para rellenar el formulario
      this.usuario.set(await this.usuariosServices.getByID(this.id()))

      this.userForm.patchValue({
        _id: this.usuario()?._id,
        first_name: this.usuario()?.first_name,
        last_name: this.usuario()?.last_name,
        email: this.usuario()?.email,
        username: this.usuario()?.username,
        password: this.usuario()?.password,
        image: this.usuario()?.image,
      })

    }
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched
  }

  async getDataForm() {
    if (this.id()) {
      try {
        const response = await this.usuariosServices.updateUser(this.id(), this.userForm.value)

        //envio al lista empleados para ver que se ha guardado.
        toast.warning('Usuario actualizado correctamente')
        this.router.navigate(['/home'])
      } catch (dataError: any) {
        console.log(dataError.error)
      }
    } else {
      try {
        const response = await this.usuariosServices.createUser(this.userForm.value)
        if (response) {
          //envio al lista empleados para ver que se ha guardado.
          toast.success('Usuario registrado correctamente')
          this.router.navigate(['/home'])
        }
        this.userForm.reset()
      } catch (dataError: any) {
        console.log(dataError.error)
      }
    }


  }
}
