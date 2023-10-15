import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosLayoutComponent } from './components/usuarios-layout/usuarios-layout.component';
import { UsuariosListComponent } from './pages/usuarios-list/usuarios-list.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosTableComponent } from './components/usuarios-table/usuarios-table.component';



@NgModule({
  declarations: [
    UsuariosLayoutComponent,
    UsuariosListComponent,
    UsuariosTableComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
