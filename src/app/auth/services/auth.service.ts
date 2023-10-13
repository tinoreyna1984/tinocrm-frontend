import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from "rxjs";
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor(private router: Router) { }

  login(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/auth/authenticate`, formValue)
    );
  }

  // obtengo el rol de acceso
  getRoleFromToken(): string | null {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.role;
    }
    return null;
  }

  // obtengo nombre del usuario
  getUserRealNameFromToken(): string | null {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.name;
    }
    return null;
  }

  // verifico que el rol sea de administrador
  isAdmin():boolean {
    return this.getRoleFromToken() === 'ADMINISTRATOR';
  }

  // cierro sesión
  logout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }
}
