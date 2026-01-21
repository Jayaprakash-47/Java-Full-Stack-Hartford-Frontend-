import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  isVisible = signal(false);
  message = signal('');
  type = signal<ToastType>('info');

  show(msg: string, type: ToastType = 'info') {
    this.message.set(msg);
    this.type.set(type);
    this.isVisible.set(true);

    setTimeout(() => {
      this.hide();
    }, 4000);
  }

  hide() {
    this.isVisible.set(false);
  }
}
