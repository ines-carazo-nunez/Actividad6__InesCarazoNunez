import { Component, inject, input, signal } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { IUsuario } from '../../interfaces/iusuario.interface';

@Component({
  selector: 'app-user-view',
  imports: [],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css',
})
export class UserViewComponent {
  id = input<string>()
  usuariosService = inject(UsuariosService);
  usuario = signal<IUsuario | null>(null);


  async ngOnInit() {
    const id: number = Number(this.id());
    //hacemos una petición al servicio
    this.usuario.set(await this.usuariosService.getByID(id))
    console.log(this.usuario());
    
  }
}
