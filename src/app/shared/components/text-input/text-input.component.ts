import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgIf} from '@angular/common';

let uniqueId = 0;

@Component({
  selector: 'app-text-input',
  imports: [
    NgIf
  ],
  standalone : true,
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor{
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'tel' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() errorMessage = '';
  @Input() autocomplete = 'off';
  @Input() maxlength?: number;
  @Input() minlength?: number;

  inputId = `app-input-${uniqueId++}`;
  value = '';
  touched = false;
  disabled = false;
  showPassword = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get inputType(): string {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  onBlur() {
    this.touched = true;
    this.onTouched();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
