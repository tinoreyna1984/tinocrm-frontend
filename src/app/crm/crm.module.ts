import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmLayoutComponent } from './components/crm-layout/crm-layout.component';
import { CrmRoutingModule } from './crm-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CrmLayoutComponent
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CrmModule { }
