import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Factura } from 'src/app/shared/interfaces/shared.interface';
import { FacturasService } from '../../services/facturas.service';

@Component({
  selector: 'app-facturas-table',
  templateUrl: './facturas-table.component.html',
  styleUrls: ['./facturas-table.component.css']
})
export class FacturasTableComponent implements OnInit {
  constructor(
    private facturasService: FacturasService,
    private factura: MatDialog
  ) {}

  loading: boolean = false;

  public dataSource: MatTableDataSource<Factura> = new MatTableDataSource<Factura>(
    []
  );
  
  displayedColumns: string[] = [
    'id',
    'codFactura',
    'formaPago',
    'fechaPago',
    'producto',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    console.log('Invocar servicio de facturas...');
    this.loading = true;
    this.facturasService.getFacturas().subscribe((facturas: Factura[]) => {
      this.dataSource = new MatTableDataSource<Factura>(facturas);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

}
