import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { GeneraFacturaComponent } from '../genera-factura/genera-factura.component';
import { Cliente, Factura } from 'src/app/shared/interfaces/shared.interface';
import { generarCodigo } from '../../utils/ventas.utils';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.component.html',
  styleUrls: ['./add-venta.component.css'],
})
export class AddVentaComponent implements OnInit {
  formAddVenta: FormGroup;
  factura?: Factura;
  ordenVenta: String = '';
  clientes!: Cliente[];
  userId: Number | null = 0;

  constructor(
    private venta: MatDialog,
    private clientesService: ClientesService,
    private authService: AuthService,
    private ventasService: VentasService,
    private snackBar: MatSnackBar
  ) {
    this.formAddVenta = new FormGroup({
      ordenVenta: new FormControl(),
      descVenta: new FormControl(),
      estadoVenta: new FormControl(),
      fechaReserva: new FormControl(),
      clienteId: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.clientesService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      error: (e: any) => {
        //console.error(e.message);
        Swal.fire(
          'Error en la carga de clientes',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
  }

  openGeneraFactura() {
    const dialogRef = this.venta.open(GeneraFacturaComponent, {
      disableClose: true,
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    });

    // aquí recibo del modal hijo la factura generada
    dialogRef.componentInstance.facturaGenerada.subscribe((factura: any) => {
      this.factura = factura;
      this.ordenVenta = generarCodigo('OV', this.factura!.id);
    });

    // genero la venta
    dialogRef.afterClosed().subscribe({
      next: () => {
        console.log('Cierra generación de factura...');
        this.formAddVenta.patchValue({
          ordenVenta: this.ordenVenta,
        });
      },
      error: (e: any) => {
        Swal.fire(
          'Error en generación de venta',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
  }

  onAddVenta() {
    if(!this.ordenVenta) return;
    this.formAddVenta.patchValue({
      fechaReserva: this.formAddVenta.get("fechaReserva")?.value + ' 00:00',
    });
    let tmpForm: any = this.formAddVenta.value;
    tmpForm = { ...tmpForm, ordenVenta: this.ordenVenta, facturaId: this.factura?.id, userId: this.userId };
    console.log(tmpForm);
    this.ventasService.addVenta(tmpForm).subscribe(
      {
        next: (response: any) => {
          //console.log(response);
          this.snackBar.openFromComponent(MessageSnackBarComponent, {
            duration: 3500,
            data: response.mensaje,
          });
        },
        error: (e:any) => {
          //console.error(e.message);
          Swal.fire('Error al agregar venta', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    );
  }
}
