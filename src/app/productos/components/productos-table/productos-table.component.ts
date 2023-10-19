import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../../../shared/interfaces/shared.interface';
import { ProductosService } from '../../services/productos.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DeleteProductoComponent } from '../delete-producto/delete-producto.component';

@Component({
  selector: 'app-productos-table',
  templateUrl: './productos-table.component.html',
  styleUrls: ['./productos-table.component.css']
})
export class ProductosTableComponent {

  constructor(
    private productosService: ProductosService,
    private authService: AuthService,
    private producto: MatDialog
  ) {}

  loading: boolean = false;
  isAdminFlag: boolean = false;

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
    //console.log('Invocar servicio de productos...');
    this.isAdminFlag = this.authService.isAdmin();
    this.loading = true;
    this.productosService.getProductos().subscribe((productos: Producto[]) => {
      this.dataSource = new MatTableDataSource<Producto>(productos);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  openBorrarProducto(productoID: string){
    const dialogRef = this.producto.open(DeleteProductoComponent, {
      data: productoID,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // después de cerrar, refresca las ventas
    dialogRef.afterClosed().subscribe(() => {
      this.loading = true;
      this.productosService.getProductos().subscribe((productos: Producto[]) => {
        this.dataSource.data = productos;
        this.loading = false;
      });
    });
  }
}
