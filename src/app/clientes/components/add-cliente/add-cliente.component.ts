import { Component, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import Swal from 'sweetalert2';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent {

  private clientesService = inject(ClientesService);
  private snackBar = inject(MatSnackBar);

  formAddCliente: FormGroup;

  constructor() {
    this.formAddCliente = new FormGroup({
      nombreCliente: new FormControl(),
      apellidosCliente: new FormControl(),
      docId: new FormControl(),
      tipoDoc: new FormControl(),
      estadoCliente: new FormControl(),
      fonoCliente: new FormControl(),
      emailCliente: new FormControl(),
    });
  }

  onAddCliente(){
    let tmpForm: any = this.formAddCliente.value;
    const {tipoDoc, estadoCliente } = this.formAddCliente.value;
    //console.log({tipoDoc, estadoCliente })
    if(!tipoDoc)
      tmpForm = {...tmpForm, tipoDoc: 'DNI'};
    if(!estadoCliente)
      tmpForm = {...tmpForm, estadoCliente: 'INTERESADO'};
    console.log(tmpForm);
    this.clientesService.addCliente(tmpForm).subscribe(
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
          Swal.fire('Error al agregar cliente', "Razón: " + e.message + ". Consulta con el administrador, por favor.", 'error' );
        }
      }
    )
  }

}
