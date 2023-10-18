import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesLayoutComponent } from './components/clientes-layout/clientes-layout.component';
import { ClientesListComponent } from './pages/clientes-list/clientes-list.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesTableComponent } from './components/clientes-table/clientes-table.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ClientesLayoutComponent,
    ClientesListComponent,
    ClientesTableComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ClientesModule { }
