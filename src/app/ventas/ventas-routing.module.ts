import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasLayoutComponent } from './components/ventas-layout/ventas-layout.component';
import { VentasListComponent } from './pages/ventas-list/ventas-list.component';

const routes: Routes = [
  {
    path: '',
    component: VentasLayoutComponent,
    children: [
      {
        path: '',
        component: VentasListComponent,
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
export class VentasRoutingModule { }
