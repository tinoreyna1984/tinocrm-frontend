import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { ProductosService } from '../../services/productos.service';

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
    this.productosService.borrarProducto(this.productoID).subscribe((response: any) => {
      this.snackBar.openFromComponent(MessageSnackBarComponent, {
        duration: 3500,
        data: response.mensaje,
      });
    });
  }
}
