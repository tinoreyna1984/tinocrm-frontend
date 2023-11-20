import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Venta } from 'src/app/shared/interfaces/shared.interface';
import { VentasService } from '../../services/ventas.service';
import { ShowVentaClienteComponent } from '../show-venta-cliente/show-venta-cliente.component';
import { ShowVentaFacturaComponent } from '../show-venta-factura/show-venta-factura.component';
import { DeleteVentaComponent } from '../delete-venta/delete-venta.component';
import Swal from 'sweetalert2';
import { AddVentaComponent } from '../add-venta/add-venta.component';

@Component({
  selector: 'app-ventas-table',
  templateUrl: './ventas-table.component.html',
  styleUrls: ['./ventas-table.component.css'],
})
export class VentasTableComponent implements OnInit {
  constructor(
    private ventasService: VentasService,
    private venta: MatDialog,
    private cliente: MatDialog,
    private factura: MatDialog
  ) {}

  loading: boolean = false;

  public dataSource: MatTableDataSource<Venta> = new MatTableDataSource<Venta>(
    []
  );

  displayedColumns: string[] = [
    'id',
    'ordenVenta',
    'descVenta',
    'estadoVenta',
    'fechaReserva',
    'nombreCliente',
    'codFactura',
    'username',
    'modificar',
    'borrar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    //console.log('Invocar servicio de ventas...');
    this.loading = true;
    this.ventasService.getVentas().subscribe(
      {
        next: (ventas: Venta[]) => {
          this.dataSource = new MatTableDataSource<Venta>(ventas);
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

  openCliente(cliente: any) {
    this.cliente.open(ShowVentaClienteComponent, {
      data: cliente,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });
  }

  openFactura(factura: any) {
    this.factura.open(ShowVentaFacturaComponent, {
      data: factura,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });
  }

  openAgregarVenta(){
    const dialogRef = this.cliente.open(AddVentaComponent, {
      disableClose: true,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.ventasService.getVentas().subscribe(
          {
            next: (ventas: Venta[]) => {
              this.dataSource.data = ventas;
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

  openBorrarVenta(ventaID: string){
    const dialogRef = this.venta.open(DeleteVentaComponent, {
      data: ventaID,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.ventasService.getVentas().subscribe(
          {
            next: (ventas: Venta[]) => {
              this.dataSource.data = ventas;
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
