import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-producto',
  templateUrl: './delete-producto.component.html',
  styleUrls: ['./delete-producto.component.css']
})
export class DeleteProductoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private productoID: string,
    private productosService: ProductosService,
    private snackBar: MatSnackBar
  ) {}


  onBorrarProducto() {
    this.productosService.borrarProducto(this.productoID).subscribe(
      {
        next: (response: any) => {
          this.snackBar.openFromComponent(MessageSnackBarComponent, {
            duration: 3500,
            data: response.mensaje,
          });
        },
        error: (e:any) => {
          //console.error(e.message);
          Swal.fire('Error al borrar producto', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
      
    );
  }
}
