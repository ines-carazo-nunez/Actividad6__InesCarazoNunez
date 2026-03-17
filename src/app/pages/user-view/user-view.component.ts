import { Component, inject, input, signal } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {
  id = input<string>()
  usuariosService = inject(UsuariosService);
  usuario = signal<IUsuario | null>(null);



  async ngOnInit() {
    const id2: string = this.id()!;
    //hacemos una petición al servicio
    this.usuario.set(await this.usuariosService.getByID(id2));;
    console.log(this.usuario());

  }

   async deleteUser(idUsuario: string | undefined) {
    const confirmed = window.confirm('Deseas borrar al usuario ' + this.usuario()?.first_name);
    if (!confirmed) {
      return;
    }
    else {
      const id = String(idUsuario);
      const response = await this.usuariosService.deleteUser(id);
      console.log(response);
    }
  }
}
