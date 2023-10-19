import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnackBarComponent } from 'src/app/shared/components/message-snack-bar/message-snack-bar.component';
import { User } from 'src/app/shared/interfaces/shared.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private userID: string,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar
  ) {}

  usuario?: User;

  onBorrarUsuario() {
    this.usuariosService.borrarUser(this.userID).subscribe((response: any) => {
      this.snackBar.openFromComponent(MessageSnackBarComponent, {
        duration: 3500,
        data: response.mensaje,
      });
    });
  }
}
