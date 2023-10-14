import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrmLayoutComponent } from './components/crm-layout/crm-layout.component';
import { DashboardPageComponent } from '../dashboard/pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: CrmLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent,
      },
      {
        path: 'ventas',
        loadChildren: () => import('../ventas/ventas.module').then( m => m.VentasModule ),
      },
      {
        path: 'facturas',
        loadChildren: () => import('../facturas/facturas.module').then( m => m.FacturasModule ),
      },
      {
        path: 'clientes',
        loadChildren: () => import('../clientes/clientes.module').then( m => m.ClientesModule ),
      },
      {
        path: 'productos',
        loadChildren: () => import('../productos/productos.module').then( m => m.ProductosModule ),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('../usuarios/usuarios.module').then( m => m.UsuariosModule ),
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
export class CrmRoutingModule { }
