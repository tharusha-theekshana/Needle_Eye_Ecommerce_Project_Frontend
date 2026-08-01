import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css'
})
export class AlertMessageComponent {
  @Input() errorMessage: string = '';
  @Output() closed = new EventEmitter<void>();

  get visible(): boolean {
    return !!(this.errorMessage);
  }

  close() {
    this.errorMessage = '';
    this.closed.emit();
  }
}
