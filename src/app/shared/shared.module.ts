import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageSnackBarComponent } from './components/message-snack-bar/message-snack-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    MessageSnackBarComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MessageSnackBarComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
