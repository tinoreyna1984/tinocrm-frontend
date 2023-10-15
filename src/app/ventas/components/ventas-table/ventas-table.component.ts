import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VentasService } from '../../services/ventas.service';
import { Venta } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-ventas-table',
  templateUrl: './ventas-table.component.html',
  styleUrls: ['./ventas-table.component.css'],
})
export class VentasTableComponent implements OnInit {
  constructor(private ventasService: VentasService) {}

  //public ventas: Venta[] = [];
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
    console.log('Invocar servicio de ventas...');
    this.ventasService.getVentas().subscribe((ventas: Venta[]) => {
      //this.ventas = ventas;
      this.dataSource = new MatTableDataSource<Venta>(ventas);
      this.dataSource.paginator = this.paginator;
    });
  }

}
