import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturasLayoutComponent } from './components/facturas-layout/facturas-layout.component';
import { FacturasListComponent } from './pages/facturas-list/facturas-list.component';

const routes: Routes = [
  {
    path: '',
    component: FacturasLayoutComponent,
    children: [
      {
        path: '',
        component: FacturasListComponent,
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
export class FacturasRoutingModule { }
