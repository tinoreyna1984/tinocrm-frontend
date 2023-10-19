import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/shared/interfaces/shared.interface';
import { ClientesService } from '../../services/clientes.service';
import { DeleteClienteComponent } from '../delete-cliente/delete-cliente.component';

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
    this.clientesService.getClientes().subscribe((clientes: Cliente[]) => {
      this.dataSource = new MatTableDataSource<Cliente>(clientes);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
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
      this.clientesService.getClientes().subscribe((clientes: Cliente[]) => {
        this.dataSource.data = clientes;
        this.loading = false;
      });
    });
  }
}
