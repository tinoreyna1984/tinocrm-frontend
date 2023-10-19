import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from 'src/app/shared/interfaces/shared.interface';

@Component({
  selector: 'app-delete-cliente',
  templateUrl: './delete-cliente.component.html',
  styleUrls: ['./delete-cliente.component.css']
})
export class DeleteClienteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private clienteID: string,
    private clientesService: ClientesService,
    private snackBar: MatSnackBar
  ) {}

  cliente?: Cliente;

  onBorrarCliente() {
    this.clientesService.borrarCliente(this.clienteID).subscribe((response: any) => {
      this.snackBar.openFromComponent(MessageSnackBarComponent, {
        duration: 3500,
        data: response.mensaje,
      });
    });
  }
}
