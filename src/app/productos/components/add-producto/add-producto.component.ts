import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent {

  private productosService = inject(ProductosService);
  private snackBar = inject(MatSnackBar);

  formAddProducto: FormGroup;

  constructor() {
    this.formAddProducto = new FormGroup({
      nombreProducto: new FormControl(),
      descProducto: new FormControl(),
      precioProducto: new FormControl(),
    });
  }

  onAddProducto(){
    console.log(this.formAddProducto.value)
    this.productosService.addProducto(this.formAddProducto.value).subscribe(
      (response: any) => {
        console.log(response);
        this.snackBar.openFromComponent(MessageSnackBarComponent, {
          duration: 3500,
          data: response.mensaje,
        });
      }
    )
  }

}
