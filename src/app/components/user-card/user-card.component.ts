import { Component, inject, input, signal } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  miUsuario = input<IUsuario>();
  usuariosService = inject(UsuariosService);


  async deleteUser(idUsuario: string | undefined) {
    const confirmed = window.confirm('Deseas borrar al usuario ' + this.miUsuario()?.first_name);
    if (!confirmed) {
      return;
    }
    else {
      const id = String(idUsuario);
      const response = await this.usuariosService.deleteUser(id);
      console.log('aquí');
      console.log(response);
    }
  }
}
