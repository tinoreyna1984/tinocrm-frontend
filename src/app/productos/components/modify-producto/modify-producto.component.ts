import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import Swal from 'sweetalert2';
import { Producto } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-modify-producto',
  templateUrl: './modify-producto.component.html',
  styleUrls: ['./modify-producto.component.css'],
})
export class ModifyProductoComponent implements OnInit {
  private productosService = inject(ProductosService);
  private snackBar = inject(MatSnackBar);
  private productoID: string = inject(MAT_DIALOG_DATA);
  private producto!: Producto;
  loading: boolean = false;

  formModifyProducto: FormGroup;

  constructor() {
    this.formModifyProducto = new FormGroup({
      nombreProducto: new FormControl(),
      descProducto: new FormControl(),
      precioProducto: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.productosService.getProducto(this.productoID).subscribe({
        next: (response: Producto) => {
          this.loading = false;
          this.producto = response;
          //console.log(this.producto);
          this.formModifyProducto.patchValue({
            nombreProducto: this.producto.nombreProducto,
            descProducto: this.producto.descProducto,
            precioProducto: this.producto.precioProducto,
          });
        },
        error: (e: any) => {
          //console.error(e.message);
          this.loading = false;
          Swal.fire(
            'Error en encontrar el producto',
            'No se encuentra el producto con ID ' + this.productoID,
            'error'
          );
        },
      });
    }, 1800);
  }

  onModifyProducto() {
    //console.log(this.formModifyProducto.value)
    this.productosService.modifyProducto(this.formModifyProducto.value, this.productoID).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.snackBar.openFromComponent(MessageSnackBarComponent, {
          duration: 3500,
          data: response.mensaje,
        });
      },
      error: (e: any) => {
        //console.error(e.message);
        Swal.fire(
          'Error al modificar producto',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
  }
}
