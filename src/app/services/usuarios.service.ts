import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario.interface';
import { IResponse } from '../interfaces/iresponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  private httpClient = inject(HttpClient);
  //url a la que conectarse
  private baseUrl = 'https://peticiones.online/api/users';

  getAllPromises(page: number): Promise<IResponse> {

    const miURL = this.baseUrl + `?page=${page}`;
    return lastValueFrom(this.httpClient.get<IResponse>(miURL));
  }

  getByID(id: number): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.get<IUsuario>(`${this.baseUrl}/${id}`));
  }

  deleteUser(id: number): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.delete<IUsuario>(`${this.baseUrl}/${id}`));
  }
}
