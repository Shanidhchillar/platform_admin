// sweet-alert.service.ts
import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  show(options: SweetAlertOptions): Promise<any> {
    return Swal.fire(options);
  }
}
