import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor(private router: Router) {}

  getProductosVendidos(): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = { Authorization: 'Bearer ' + token };
    return this.http
      .get<any>(`${this.baseUrl}/dashboard/productos-vendidos`, { headers })
      .pipe(map((prods: any) => prods));
  }

  getTotalVendido() {
    const token = localStorage.getItem('jwt');
    const headers = { Authorization: 'Bearer ' + token };
    return this.http
      .get<any>(`${this.baseUrl}/dashboard/total-vendido`, { headers })
      .pipe(map((totalVendido: any) => totalVendido));
  }
}
