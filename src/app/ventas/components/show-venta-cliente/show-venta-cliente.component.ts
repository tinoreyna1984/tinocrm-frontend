import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-venta-cliente',
  templateUrl: './show-venta-cliente.component.html',
  styleUrls: ['./show-venta-cliente.component.css']
})
export class ShowVentaClienteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public cliente: any) {}
}

