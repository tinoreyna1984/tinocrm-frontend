import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturasLayoutComponent } from './components/facturas-layout/facturas-layout.component';
import { FacturasListComponent } from './pages/facturas-list/facturas-list.component';
import { FacturasRoutingModule } from './facturas-routing.module';



@NgModule({
  declarations: [
    FacturasLayoutComponent,
    FacturasListComponent
  ],
  imports: [
    CommonModule,
    FacturasRoutingModule
  ]
})
export class FacturasModule { }
