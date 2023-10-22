import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/shared/interfaces/shared.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { DeleteUsuarioComponent } from '../delete-usuario/delete-usuario.component';
import Swal from 'sweetalert2';
import { AddUsuarioComponent } from '../add-usuario/add-usuario.component';
import { ModifyUsuarioComponent } from '../modify-usuario/modify-usuario.component';

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

  openAgregarUsuario(){
    const dialogRef = this.usuario.open(AddUsuarioComponent, {
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.usuariosService.getUsers().subscribe(
          {
            next: (users: User[]) => {
              this.dataSource.data = users;
              this.loading = false;
            },
            error: (e:any) => {
              //console.error(e.message);
              this.loading = false;
              Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
            }
          }
        );
      }, 1800);
    });
  }

  openModificarUsuario(usuarioID: string){
    const dialogRef = this.usuario.open(ModifyUsuarioComponent, {
      data: usuarioID,
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
    });}

  openBorrarUsuario(usuarioID: string){
    const dialogRef = this.usuario.open(DeleteUsuarioComponent, {
      data: usuarioID,
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
