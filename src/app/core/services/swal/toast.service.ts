import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import type { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private useTimer = true; // padrão = com timer

  /** Ativa ou desativa o timer dinamicamente */
  setTimerEnabled(enabled: boolean):void {
    this.useTimer = enabled;
  };

  /** Cria uma instância do Toast respeitando a flag */
  private getToast(){
    return Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      showCloseButton: true,
      timer: this.useTimer ? 3500 : undefined,
      timerProgressBar: this.useTimer,
      didOpen: (toast) => {
        if (this.useTimer) {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      }
    });
  };

  private show(icon: SweetAlertIcon, message: string):void {
    this.getToast().fire({
      icon,
      title: message
    });
  };

  success(message: string):void {
    this.show('success', message);
  };

  error(message: string):void {
    this.show('error', message);
  };

  info(message: string):void {
    this.show('info', message);
  };

  warning(message: string):void {
    this.show('warning', message);
  };

};
