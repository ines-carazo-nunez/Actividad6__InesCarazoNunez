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

  getByID(id: string | undefined): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.get<IUsuario>(`${this.baseUrl}/${id}`));
  }

  createUser(usuario: IUsuario): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.post<IUsuario>(this.baseUrl, usuario));
  }

  updateUser(id: string | undefined, body: IUsuario): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.put<IUsuario>(`${this.baseUrl}/${id}`, body));
  }

  deleteUser(id: string | undefined): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.delete<IUsuario>(`${this.baseUrl}/${id}`));
  }
}
