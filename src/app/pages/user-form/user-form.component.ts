import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';

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
  //productosService = inject(ProductosService)
  usuario = signal<IUsuario | undefined>(undefined)
  isUpdateMode: boolean = false;

  async ngOnInit() {
    const idUsuario: string = this.id()!;

    this.isUpdateMode = !!this.id; // Si hay id, isUpdateMode es true

    if (this.isUpdateMode) {
      //hacemos una petición al servicio
      this.usuario.set(await this.usuariosServices.getByID(idUsuario));;
      console.log(this.usuario());
    }

  }

  constructor() {
    console.log(this.id());

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
      urlimage: new FormControl("", [
        Validators.required
      ]),
    }, [])
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched
  }

  async getDataForm() {
    if (this.isUpdateMode) {
      // Llamar a servicio.actualizar(id, datos)
    } else {
      // Llamar a servicio.crear(datos)
      console.log(this.userForm.value.urlimage);
      let usuario: IUsuario = {
        first_name: this.userForm.value.nombre,
        last_name: this.userForm.value.apellido,
        username: this.userForm.value.nombre + this.userForm.value.apellido,
        email: this.userForm.value.email,
        image: this.userForm.value.urlimage,
        password: '12345'
      }
      const response: IUsuario = await this.usuariosServices.createUser(usuario);
      console.log(response);
      alert('Usuario creado con éxito');
      this.userForm.reset()
    }

  }
}
