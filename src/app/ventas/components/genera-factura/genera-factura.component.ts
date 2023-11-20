import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { FacturasService } from 'src/app/facturas/services/facturas.service';
import { ProductosService } from 'src/app/productos/services/productos.service';
import { Factura, Producto } from 'src/app/shared/interfaces/shared.interface';
import Swal from 'sweetalert2';
import { VentasService } from '../../services/ventas.service';
import { generarCodigo } from '../../utils/ventas.utils';

@Component({
  selector: 'app-genera-factura',
  templateUrl: './genera-factura.component.html',
  styleUrls: ['./genera-factura.component.css'],
})
export class GeneraFacturaComponent implements OnInit {
  formGeneraFactura: FormGroup;

  @Output() facturaGenerada: EventEmitter<any> = new EventEmitter();

  constructor(
    private productosService: ProductosService,
    private ventasService: VentasService,
    private facturasService: FacturasService,
    private snackBar: MatSnackBar,
  ) {
    this.formGeneraFactura = new FormGroup({
      codFactura: new FormControl(),
      formaPago: new FormControl(),
      productoId: new FormControl(),
      fechaPago: new FormControl(),
    });
  }

  productos!: Producto[];
  codigoFac: String = '';
  factura!: Factura;

  ngOnInit(): void {
    this.ventasService.getNextVentaID().subscribe({
      next: (id: Number) => {
        this.codigoFac = generarCodigo('INV', id);
      },
      error: (e: any) => {
        //console.error(e.message);
        Swal.fire(
          'Error en la carga de proximo ID venta',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
    this.productosService.getProductos().subscribe({
      next: (productos: Producto[]) => {
        this.productos = productos;
      },
      error: (e: any) => {
        //console.error(e.message);
        Swal.fire(
          'Error en la carga de productos',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
  }

  onGeneraFactura() {
    this.formGeneraFactura.patchValue({
      codFactura: this.codigoFac,
      fechaPago: this.formGeneraFactura.get('fechaPago')?.value + ' 00:00',
    });
    this.facturasService.addFactura(this.formGeneraFactura.value).subscribe(
      {
        next: (response: any) => {
          this.snackBar.openFromComponent(MessageSnackBarComponent, {
            duration: 3500,
            data: response.mensaje,
          });
          this.factura = response.factura;
          this.facturaGenerada.emit(this.factura); // para pasarle al modal padre
        },
        error: (e:any) => {
          Swal.fire('Error en generación de factura', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    );
  }
}
