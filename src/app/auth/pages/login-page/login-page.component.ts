import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup;
  loading: boolean = false;
  errorMsg: string = '';

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  // llamo al servicio AuthService
  async onLogin() {
    if (this.loading) {
      return; // Evita múltiples solicitudes si ya se está cargando
    }

    this.loading = true; // Establece el estado de carga a true

    try {
      const res: any = await this.authService.login(this.form.value); // uso servicio de login
      //console.log(res);
      if(res.jwt){
        localStorage.setItem('jwt', res.jwt); // Almacena el token JWT en el almacenamiento local
        this.router.navigate(['/crm']); // dirige a la página "/crm"
      }
    } catch (error: any) {
      console.log(error);
      this.errorMsg = error.message;
      Swal.fire('Error en el acceso', "Razón: " + this.errorMsg + ". Consulta con el administrador, por favor", 'error' );
    } finally {
      this.loading = false; // Restaura el estado de carga a false, ya sea en éxito o error
    }
  }
}
