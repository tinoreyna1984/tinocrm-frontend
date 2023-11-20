import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import Swal from 'sweetalert2';
import { VentasService } from '../../services/ventas.service';
import { Venta } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-modify-venta',
  templateUrl: './modify-venta.component.html',
  styleUrls: ['./modify-venta.component.css'],
})
export class ModifyVentaComponent implements OnInit {
  formModifyVenta: FormGroup;
  venta!: Venta;
  private ventaID: string = inject(MAT_DIALOG_DATA);
  loading: boolean = false;

  constructor(
    private ventasService: VentasService,
    private snackBar: MatSnackBar
  ) {
    this.formModifyVenta = new FormGroup({
      ordenVenta: new FormControl(),
      descVenta: new FormControl(),
      estadoVenta: new FormControl(),
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.ventasService.getVenta(this.ventaID).subscribe({
        next: (response: Venta) => {
          this.loading = false;
          this.venta = response;
          //console.log(this.producto);
          this.formModifyVenta.patchValue({
            ordenVenta: this.venta.ordenVenta,
            descVenta: this.venta.descVenta,
            estadoVenta: this.venta.estadoVenta,
          });
        },
        error: (e: any) => {
          //console.error(e.message);
          this.loading = false;
          Swal.fire(
            'Error en encontrar el producto',
            'No se encuentra el producto con ID ' + this.ventaID,
            'error'
          );
        },
      });
    }, 1800);
  }

  onModifyVenta() {
    let tmpForm: any = this.formModifyVenta.value;
    tmpForm = {
      ...tmpForm,
      fechaReserva: this.venta.fechaReserva,
      clienteId: this.venta.cliente.id,
      facturaId: this.venta.factura.id,
      userId: this.venta.user.id,
    };
    this.ventasService.modifyVenta(tmpForm, this.ventaID).subscribe({
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
          'Error al modificar venta',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
  }
}
