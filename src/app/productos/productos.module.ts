import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosLayoutComponent } from './components/productos-layout/productos-layout.component';
import { ProductosListComponent } from './pages/productos-list/productos-list.component';
import { ProductosRoutingModule } from './productos-routing.module';



@NgModule({
  declarations: [
    ProductosLayoutComponent,
    ProductosListComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
