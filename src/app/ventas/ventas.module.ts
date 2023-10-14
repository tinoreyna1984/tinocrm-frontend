import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasLayoutComponent } from './components/ventas-layout/ventas-layout.component';
import { VentasListComponent } from './pages/ventas-list/ventas-list.component';
import { VentasRoutingModule } from './ventas-routing.module';



@NgModule({
  declarations: [
    VentasLayoutComponent,
    VentasListComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule
  ]
})
export class VentasModule { }
