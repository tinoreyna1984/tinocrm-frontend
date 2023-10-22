import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesLayoutComponent } from './components/clientes-layout/clientes-layout.component';
import { ClientesListComponent } from './pages/clientes-list/clientes-list.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesTableComponent } from './components/clientes-table/clientes-table.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { DeleteClienteComponent } from './components/delete-cliente/delete-cliente.component';
import { AddClienteComponent } from './components/add-cliente/add-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifyClienteComponent } from './components/modify-cliente/modify-cliente.component';



@NgModule({
  declarations: [
    ClientesLayoutComponent,
    ClientesListComponent,
    ClientesTableComponent,
    DeleteClienteComponent,
    AddClienteComponent,
    ModifyClienteComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
