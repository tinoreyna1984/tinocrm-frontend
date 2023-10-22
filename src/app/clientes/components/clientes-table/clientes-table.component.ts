import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/shared/interfaces/shared.interface';
import { ClientesService } from '../../services/clientes.service';
import { DeleteClienteComponent } from '../delete-cliente/delete-cliente.component';
import Swal from 'sweetalert2';
import { AddClienteComponent } from '../add-cliente/add-cliente.component';
import { ModifyClienteComponent } from '../modify-cliente/modify-cliente.component';

@Component({
  selector: 'app-clientes-table',
  templateUrl: './clientes-table.component.html',
  styleUrls: ['./clientes-table.component.css']
})
export class ClientesTableComponent implements OnInit {
  constructor(
    private clientesService: ClientesService,
    private cliente: MatDialog
  ) {}

  loading: boolean = false;

  public dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>(
    []
  );
  
  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
    'documento',
    'estadoCliente',
    'fonoCliente',
    'emailCliente',
    'modificar',
    'borrar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    //console.log('Invocar servicio de clientes...');
    this.loading = true;
    this.clientesService.getClientes().subscribe(
      {
        next: (clientes: Cliente[]) => {
            this.dataSource = new MatTableDataSource<Cliente>(clientes);
            this.dataSource.paginator = this.paginator;
            this.loading = false;
        },
        error: (e:any) => {
          //console.error(e.message);
          this.loading = false;
          Swal.fire('Error en la carga', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    );
  }

  openAgregarCliente(){
    const dialogRef = this.cliente.open(AddClienteComponent, {
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.clientesService.getClientes().subscribe(
          {
            next: (clientes: Cliente[]) => {
              this.dataSource.data = clientes;
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

  openModificarCliente(clienteID: string){
    const dialogRef = this.cliente.open(ModifyClienteComponent, {
      data: clienteID,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.clientesService.getClientes().subscribe(
          {
            next: (clientes: Cliente[]) => {
              this.dataSource.data = clientes;
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

  openBorrarCliente(clienteID: string){
    const dialogRef = this.cliente.open(DeleteClienteComponent, {
      data: clienteID,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.clientesService.getClientes().subscribe(
          {
            next: (clientes: Cliente[]) => {
              this.dataSource.data = clientes;
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
}
