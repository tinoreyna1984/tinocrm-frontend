import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosLayoutComponent } from './components/productos-layout/productos-layout.component';
import { ProductosListComponent } from './pages/productos-list/productos-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductosLayoutComponent,
    children: [
      {
        path: '',
        component: ProductosListComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
