import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { VentasService } from '../../services/ventas.service';
import { FacturasService } from 'src/app/facturas/services/facturas.service';
import { catchError, throwError } from 'rxjs';
import { Venta } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-delete-venta',
  templateUrl: './delete-venta.component.html',
  styleUrls: ['./delete-venta.component.css'],
})
export class DeleteVentaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private ventaID: string,
    private ventasService: VentasService,
    private facturasService: FacturasService,
    private snackBar: MatSnackBar
  ) {}

  venta?: Venta;

  onBorrarVenta() {
    // primero debo buscar y borrar la factura (si la venta fue concretada)
    this.ventasService.getVenta(this.ventaID).subscribe((venta: Venta) => {
      this.venta = venta;
      //console.log(this.venta);

      if (this.venta.factura) {
        // La venta tiene una factura, entonces puedes borrar la factura.
        this.facturasService
          .borrarFactura(this.venta.factura.id.toString())
          .pipe(
            catchError((error) => {
              // control del error
              console.error('Error al borrar la factura: ', error);
              return throwError(() => error);
            })
          )
          .subscribe(() => {
            // Manejar la respuesta de la eliminación de la factura aquí, si es necesario.
          });
      }
    });

    // independientemente de si hay factura o no, borro registro de venta
    this.ventasService.borrarVenta(this.ventaID).subscribe((response: any) => {
      this.snackBar.openFromComponent(MessageSnackBarComponent, {
        duration: 3500,
        data: response.mensaje,
      });
    });
  }
}
