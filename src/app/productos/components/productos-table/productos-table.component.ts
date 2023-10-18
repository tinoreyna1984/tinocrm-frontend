import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../../../shared/interfaces/shared.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos-table',
  templateUrl: './productos-table.component.html',
  styleUrls: ['./productos-table.component.css']
})
export class ProductosTableComponent {

  constructor(
    private productosService: ProductosService,
    private producto: MatDialog
  ) {}

  loading: boolean = false;

  public dataSource: MatTableDataSource<Producto> = new MatTableDataSource<Producto>(
    []
  );

  displayedColumns: string[] = [
    'id',
    'nombreProducto',
    'descProducto',
    'precioProducto',
    'modificar',
    'borrar'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    console.log('Invocar servicio de productos...');
    this.loading = true;
    this.productosService.getProductos().subscribe((productos: Producto[]) => {
      this.dataSource = new MatTableDataSource<Producto>(productos);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

}
