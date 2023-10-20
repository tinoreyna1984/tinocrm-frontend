import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosLayoutComponent } from './components/productos-layout/productos-layout.component';
import { ProductosListComponent } from './pages/productos-list/productos-list.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosTableComponent } from './components/productos-table/productos-table.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { DeleteProductoComponent } from './components/delete-producto/delete-producto.component';
import { AddProductoComponent } from './components/add-producto/add-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductosLayoutComponent,
    ProductosListComponent,
    ProductosTableComponent,
    DeleteProductoComponent,
    AddProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductosModule { }
