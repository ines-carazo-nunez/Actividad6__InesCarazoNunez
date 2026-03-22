import { Component, inject, input, signal } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

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

  }

  async deleteUser(idUsuario: string | undefined) {
    const confirmado: boolean = confirm("¿Deseas borrar al usuario " + this.usuario()?.first_name + "?");

    if (confirmado) {
      toast.error("Usuario " + this.usuario()?.first_name + " borrado")

      const id = String(idUsuario);
      const response = await this.usuariosService.deleteUser(id);
    } else {
      toast.info("NO se ha borrado al usuario " + this.usuario()?.first_name)

      return;
    }
  }
}
