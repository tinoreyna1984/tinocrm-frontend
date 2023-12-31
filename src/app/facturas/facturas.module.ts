import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturasLayoutComponent } from './components/facturas-layout/facturas-layout.component';
import { FacturasListComponent } from './pages/facturas-list/facturas-list.component';
import { FacturasRoutingModule } from './facturas-routing.module';
import { FacturasTableComponent } from './components/facturas-table/facturas-table.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ShowFacturaProductoComponent } from './components/show-factura-producto/show-factura-producto.component';



@NgModule({
  declarations: [
    FacturasLayoutComponent,
    FacturasListComponent,
    FacturasTableComponent,
    ShowFacturaProductoComponent
  ],
  imports: [
    CommonModule,
    FacturasRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class FacturasModule { }
