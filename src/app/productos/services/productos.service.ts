import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Producto } from 'src/app/shared/interfaces/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor(private router: Router) { }
  
  getProductos(): Observable<Producto[]> {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/productos`, { headers })
    .pipe(
      map((clientes: any) => clientes)
    );
  }

  getProducto(id: string): Observable<Producto>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/productos/${id}`, { headers })
    .pipe(
      map((cliente: any) => cliente)
    );
  }

  borrarProducto(id: string) {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.delete<any>(`${this.baseUrl}/productos/${id}`, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

}
