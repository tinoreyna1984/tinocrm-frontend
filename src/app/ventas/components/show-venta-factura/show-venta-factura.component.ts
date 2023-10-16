import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-venta-factura',
  templateUrl: './show-venta-factura.component.html',
  styleUrls: ['./show-venta-factura.component.css']
})
export class ShowVentaFacturaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public factura: any) {}
}
