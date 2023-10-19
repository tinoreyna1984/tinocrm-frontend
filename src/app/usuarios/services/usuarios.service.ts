import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/shared/interfaces/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor(private router: Router) { }
  
  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/users`, { headers })
    .pipe(
      map((clientes: any) => clientes)
    );
  }

  getUser(id: string): Observable<User>{
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.get<any>(`${this.baseUrl}/users/${id}`, { headers })
    .pipe(
      map((cliente: any) => cliente)
    );
  }

  borraruser(id: string) {
    const token = localStorage.getItem('jwt');
    const headers = { 'Authorization': 'Bearer ' + token }
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`, { headers })
    .pipe(
      map((response: any) => response)
    );
  }

}
