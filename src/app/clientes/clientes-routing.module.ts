import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesLayoutComponent } from './components/clientes-layout/clientes-layout.component';
import { ClientesListComponent } from './pages/clientes-list/clientes-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesLayoutComponent,
    children: [
      {
        path: '',
        component: ClientesListComponent,
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
export class ClientesRoutingModule { }
