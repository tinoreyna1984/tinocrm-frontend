import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Factura } from 'src/app/shared/interfaces/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor(private router: Router) { }
  
  getFacturas(): Observable<Factura[]> {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/facturas`, { headers })
    .pipe(
      map((clientes: any) => clientes)
    );
  }

  getFactura(id: string): Observable<Factura>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/facturas/${id}`, { headers })
    .pipe(
      map((cliente: any) => cliente)
    );
  }

  borrarFactura(id: string) {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.delete<any>(`${this.baseUrl}/facturas/${id}`, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

}
