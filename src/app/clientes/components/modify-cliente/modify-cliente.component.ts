import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import Swal from 'sweetalert2';
import { Cliente } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-modify-cliente',
  templateUrl: './modify-cliente.component.html',
  styleUrls: ['./modify-cliente.component.css']
})
export class ModifyClienteComponent implements OnInit {
  private clientesService = inject(ClientesService);
  private snackBar = inject(MatSnackBar);
  private clienteID: string = inject(MAT_DIALOG_DATA);
  private cliente!: Cliente;
  loading: boolean = false;

  formModifyCliente: FormGroup;

  constructor() {
    this.formModifyCliente = new FormGroup({
      nombreCliente: new FormControl(),
      apellidosCliente: new FormControl(),
      docId: new FormControl(),
      tipoDoc: new FormControl(),
      estadoCliente: new FormControl(),
      fonoCliente: new FormControl(),
      emailCliente: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.clientesService.getCliente(this.clienteID).subscribe({
        next: (response: Cliente) => {
          this.loading = false;
          this.cliente = response;
          //console.log(this.producto);
          this.formModifyCliente.patchValue({
            nombreCliente: this.cliente.nombreCliente,
            apellidosCliente: this.cliente.apellidosCliente,
            docId: this.cliente.docId,
            tipoDoc: this.cliente.tipoDoc,
            estadoCliente: this.cliente.estadoCliente,
            fonoCliente: this.cliente.fonoCliente,
            emailCliente: this.cliente.emailCliente,
          });
        },
        error: (e: any) => {
          //console.error(e.message);
          this.loading = false;
          Swal.fire(
            'Error en encontrar el producto',
            'No se encuentra el producto con ID ' + this.clienteID,
            'error'
          );
        },
      });
    }, 1800);
  }

  onModifyCliente(){
    let tmpForm: any = this.formModifyCliente.value;
    const { estadoCliente } = this.formModifyCliente.value;
    if(!estadoCliente)
      tmpForm = {...tmpForm, estadoCliente: 'INTERESADO'};
    this.clientesService.modifyCliente(tmpForm, this.clienteID).subscribe({
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
          'Error al modificar cliente',
          'Razón: ' + e.message + '. Consulta con el administrador, por favor.',
          'error'
        );
      },
    });
  }

}
