import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-crm',
  templateUrl: './crm-layout.component.html',
  styleUrls: ['./crm-layout.component.css']
})
export class CrmLayoutComponent implements OnInit  {

  userRole: string | null = '';
  userRealName: string | null = '';
  isAdminFlag: boolean = false;

  constructor(private authService: AuthService) {}

  // al iniciar el componente
  ngOnInit(): void {
    this.userRole = this.authService.getRoleFromToken();
    this.userRealName = this.authService.getUserRealNameFromToken();
    this.isAdminFlag = this.authService.isAdmin();
    console.log("rol: " + this.userRole);
    console.log("nombre: " + this.userRealName);
    console.log("isAdmin: " + this.isAdminFlag);
  }

  onLogout() {
    this.authService.logout();
  }

}
