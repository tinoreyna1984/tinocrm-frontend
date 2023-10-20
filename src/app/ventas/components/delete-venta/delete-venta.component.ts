import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { VentasService } from '../../services/ventas.service';
import { FacturasService } from 'src/app/facturas/services/facturas.service';
import { catchError, throwError } from 'rxjs';
import { Venta } from 'src/app/shared/interfaces/shared.interface';
import Swal from 'sweetalert2';

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
    this.ventasService.borrarVenta(this.ventaID).subscribe(
      {
        next: (response: any) => {
          this.snackBar.openFromComponent(MessageSnackBarComponent, {
            duration: 3500,
            data: response.mensaje,
          });
        },
        error: (e:any) => {
          //console.error(e.message);
          Swal.fire('Error al borrar venta', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
      
    );
  }
}
