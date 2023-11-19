import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Venta } from 'src/app/shared/interfaces/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor(private router: Router) { }

  getVentas(): Observable<Venta[]> {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/ventas`, { headers })
    .pipe(
      map((ventas: any) => ventas)
    );
  }

  getVenta(id: string): Observable<Venta>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/ventas/${id}`, { headers })
    .pipe(
      map((venta: any) => venta)
    );
  }

  getNextVentaID(): Observable<Number> {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/ventas/next-id-venta`, { headers })
    .pipe(
      map((nextVentaId: Number) => nextVentaId)
    );
  }

  addVenta(formAddVenta:any): Observable<Venta>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.post<any>(`${this.baseUrl}/ventas`, formAddVenta, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

  modifyVenta(formModifyVenta:any, id: string): Observable<Venta>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.put<any>(`${this.baseUrl}/ventas/${id}`, formModifyVenta, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

  borrarVenta(id: string) {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.delete<any>(`${this.baseUrl}/ventas/${id}`, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

}
