import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosLayoutComponent } from './components/productos-layout/productos-layout.component';
import { ProductosListComponent } from './pages/productos-list/productos-list.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosTableComponent } from './components/productos-table/productos-table.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductosLayoutComponent,
    ProductosListComponent,
    ProductosTableComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ProductosModule { }
