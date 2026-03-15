import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { IResponse } from '../../interfaces/iresponse.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  arrUsuariosPromises = signal<IUsuario[]>([]);
  usuariosServices = inject(UsuariosService);
  page: number = 1;
  totalPages!: number;
  /* linkNext: string = "";
  linkPrev: string = "" */


  ngOnInit() {
    this.cargarPersonajes();
  }

  async cargarPersonajes(page: number = 1) {
    try {
      const response: IResponse = await this.usuariosServices.getAllPromises(page);
      this.arrUsuariosPromises.set(response.results);
      console.log('AQUÍ');
      console.log(response);
      console.log(response.results);

      this.page = response.page;
      this.totalPages = response.total_pages;
    } catch (error) {
      console.log(error);
    }

  }

    goToNext() {
      let nextPage = this.totalPages === this.page ? 1 : this.page + 1;
     this.cargarPersonajes(nextPage);
   }
 
   goToPrev() {
    let prevPage = this.totalPages !== this.page ? 2 : this.page - 1;
     this.cargarPersonajes(prevPage);
   } 
}
