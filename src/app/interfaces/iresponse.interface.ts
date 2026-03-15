import { IUsuario } from "./iusuario.interface";

export interface IResponse {
   
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  results: IUsuario[]
}
