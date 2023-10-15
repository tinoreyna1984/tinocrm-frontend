import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasLayoutComponent } from './components/ventas-layout/ventas-layout.component';
import { VentasListComponent } from './pages/ventas-list/ventas-list.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { VentasTableComponent } from './components/ventas-table/ventas-table.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    VentasLayoutComponent,
    VentasListComponent,
    VentasTableComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    MaterialModule
  ]
})
export class VentasModule { }
