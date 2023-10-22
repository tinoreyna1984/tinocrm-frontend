import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-factura-producto',
  templateUrl: './show-factura-producto.component.html',
  styleUrls: ['./show-factura-producto.component.css']
})
export class ShowFacturaProductoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public producto: any) {}
}
