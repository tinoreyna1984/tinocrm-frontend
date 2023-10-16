import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasLayoutComponent } from './components/ventas-layout/ventas-layout.component';
import { VentasListComponent } from './pages/ventas-list/ventas-list.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { VentasTableComponent } from './components/ventas-table/ventas-table.component';
import { MaterialModule } from '../material/material.module';
import { AddVentaComponent } from './components/add-venta/add-venta.component';
import { ModifyVentaComponent } from './components/modify-venta/modify-venta.component';
import { DeleteVentaComponent } from './components/delete-venta/delete-venta.component';
import { ShowVentaClienteComponent } from './components/show-venta-cliente/show-venta-cliente.component';
import { ShowVentaFacturaComponent } from './components/show-venta-factura/show-venta-factura.component';



@NgModule({
  declarations: [
    VentasLayoutComponent,
    VentasListComponent,
    VentasTableComponent,
    AddVentaComponent,
    ModifyVentaComponent,
    DeleteVentaComponent,
    ShowVentaClienteComponent,
    ShowVentaFacturaComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    MaterialModule
  ]
})
export class VentasModule { }
