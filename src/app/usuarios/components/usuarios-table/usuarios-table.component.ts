import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/interfaces/shared.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrls: ['./usuarios-table.component.css']
})
export class UsuariosTableComponent {
  constructor(
    private usuariosService: UsuariosService,
    private usuario: MatDialog,
  ) {}
  
  loading: boolean = false;

  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(
    []
  );

  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'nombreCompleto',
    'role',
    'habilitado',
    'modificar',
    'borrar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    //console.log('Invocar servicio de ventas...');
    this.loading = true;
    this.usuariosService.getUsers().subscribe((usuarios: User[]) => {
      this.dataSource = new MatTableDataSource<User>(usuarios);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

}
