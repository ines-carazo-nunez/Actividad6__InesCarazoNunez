import { Component, inject, input, signal } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { toast } from 'ngx-sonner';

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
    const confirmado: boolean = confirm("¿Deseas borrar al usuario " + this.miUsuario()?.first_name + "?");

    if (confirmado) {
      const response = await this.usuariosService.deleteUser(idUsuario);
      toast.error("Usuario " + this.miUsuario()?.first_name + " borrado")
    } else {
      toast.info("NO se ha borrado al usuario " + this.miUsuario()?.first_name)
      return;
    }
  }
}
