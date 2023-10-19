import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosLayoutComponent } from './components/usuarios-layout/usuarios-layout.component';
import { UsuariosListComponent } from './pages/usuarios-list/usuarios-list.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosTableComponent } from './components/usuarios-table/usuarios-table.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { EnabledStatusPipe } from './pipes/enabled-status.pipe';



@NgModule({
  declarations: [
    UsuariosLayoutComponent,
    UsuariosListComponent,
    UsuariosTableComponent,
    EnabledStatusPipe
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class UsuariosModule { }
