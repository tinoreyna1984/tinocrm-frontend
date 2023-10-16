import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-delete-venta',
  templateUrl: './delete-venta.component.html',
  styleUrls: ['./delete-venta.component.css']
})
export class DeleteVentaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private ventaID: string,
    private ventasService: VentasService,
    private snackBar: MatSnackBar
  ) {}

  onBorrarVenta(){
    console.log(this.ventaID);
    this.ventasService.borrarVenta(this.ventaID).subscribe((response: any) => {
      this.snackBar.openFromComponent(MessageSnackBarComponent, {
        duration: 3500,
        data: response.mensaje,
      });
    })
  }
}
