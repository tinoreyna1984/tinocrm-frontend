import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosLayoutComponent } from './components/usuarios-layout/usuarios-layout.component';
import { UsuariosListComponent } from './pages/usuarios-list/usuarios-list.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosTableComponent } from './components/usuarios-table/usuarios-table.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { EnabledStatusPipe } from './pipes/enabled-status.pipe';
import { DeleteUsuarioComponent } from './components/delete-usuario/delete-usuario.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { ModifyUsuarioComponent } from './components/modify-usuario/modify-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsuariosLayoutComponent,
    UsuariosListComponent,
    UsuariosTableComponent,
    EnabledStatusPipe,
    DeleteUsuarioComponent,
    AddUsuarioComponent,
    ModifyUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
