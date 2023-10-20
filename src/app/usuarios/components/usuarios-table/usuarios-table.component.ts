import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/interfaces/shared.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { DeleteUsuarioComponent } from '../delete-usuario/delete-usuario.component';
import Swal from 'sweetalert2';

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
    //'habilitar',
    'borrar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    //console.log('Invocar servicio de ventas...');
    this.loading = true;
    this.usuariosService.getUsers().subscribe(
      {
        next: (usuarios: User[]) => {
          this.dataSource = new MatTableDataSource<User>(usuarios);
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        },
        error: (e:any) => {
          //console.error(e.message);
          Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
      
    );
  }

  openBorrarUsuario(ventaID: string){
    const dialogRef = this.usuario.open(DeleteUsuarioComponent, {
      data: ventaID,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.usuariosService.getUsers().subscribe(
          {
            next: (usuarios: User[]) => {
              this.dataSource.data = usuarios;
              this.loading = false;
            },
            error: (e:any) => {
              //console.error(e.message);
              Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
            }
          }
        );
      }, 1800);
    });
  }
}
