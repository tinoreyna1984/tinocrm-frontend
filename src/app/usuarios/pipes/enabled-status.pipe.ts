import { Pipe, PipeTransform } from '@angular/core';

// convierte TRUE/FALSE a Sí/No, respectivamente
@Pipe({
  name: 'enabledStatus'
})
export class EnabledStatusPipe implements PipeTransform {

  transform(enabled:boolean): string {
    return enabled ? "Sí" : "No";
  }

}
