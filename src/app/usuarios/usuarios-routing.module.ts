import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosLayoutComponent } from './components/usuarios-layout/usuarios-layout.component';
import { UsuariosListComponent } from './pages/usuarios-list/usuarios-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosLayoutComponent,
    children: [
      {
        path: '',
        component: UsuariosListComponent,
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
export class UsuariosRoutingModule { }
