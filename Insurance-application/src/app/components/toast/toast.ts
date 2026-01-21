import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (toastService.isVisible()) {
      <div class="toast-container">
        <div class="toast" [class]="toastService.type()">
          <div class="icon-area">
            @if (toastService.type() === 'success') { <span>✓</span> }
            @else if (toastService.type() === 'error') { <span>✕</span> }
            @else { <span>ℹ</span> }
          </div>
          <div class="message-area">
            {{ toastService.message() }}
          </div>
          <button class="close-btn" (click)="toastService.hide()">×</button>
        </div>
      </div>
    }
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    }

    .toast {
      display: flex;
      align-items: center;
      min-width: 300px;
      padding: 1rem;
      border-radius: 12px;
      background: white;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      border-left: 6px solid #ccc;
      gap: 12px;
    }

    .toast.success { border-left-color: #4caf50; }
    .toast.success .icon-area { background: #e8f5e9; color: #2e7d32; }
    
    .toast.error { border-left-color: #f44336; }
    .toast.error .icon-area { background: #ffebee; color: #c62828; }

    .toast.info { border-left-color: #2196f3; }
    .toast.info .icon-area { background: #e3f2fd; color: #1565c0; }

    .icon-area {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .message-area {
      flex: 1;
      font-weight: 500;
      color: #333;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #999;
      cursor: pointer;
      line-height: 1;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
