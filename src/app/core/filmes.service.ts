import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';

const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  listar(pagina: number, qtdPagina: number, texto: string, genero: string): Observable<Filme[]> {
    let httpParam = new HttpParams();
    httpParam = httpParam.set('_page', pagina.toString());
    httpParam = httpParam.set('_limit', qtdPagina.toString());
    httpParam = httpParam.set('_sort', 'id');
    httpParam = httpParam.set('_order', 'desc');
    //q significa full-text-search
    if (texto) httpParam = httpParam.set('q', texto);
    if (genero) httpParam = httpParam.set('genero', genero);

    return this.http.get<Filme[]>(url, {params: httpParam});
  }


}
