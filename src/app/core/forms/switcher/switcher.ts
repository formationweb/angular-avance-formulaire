import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChange = (value: boolean) => void
type OnTouched = () => void

@Component({
  selector: 'app-switcher',
  imports: [],
  template: `
    <div class="switch" [class.on]="value" [class.disabled]="disabled" (click)="toggle()">{{ value ? 'ON' : 'OFF' }}</div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switcher),
      multi: true
    },
  ],
  styles: `
    .switch {
      width: 60px;
      padding: 6px;
      text-align: center;
      cursor: pointer;
      background: #ccc;
      border-radius: 20px;
    }
    .switch.on {
      background: #4caf50;
      color: white;
    }
    .switch.disabled {
      opacity: 0.5;
    }
  `
})
export class Switcher implements ControlValueAccessor {
  value = false
  disabled = false
  onChange: OnChange = () => {}
  onTouched: OnTouched = () => {}
  
  writeValue(value: boolean) {
    this.value = value
  }

  registerOnChange(fn: OnChange) {
    this.onChange = fn
  }

  registerOnTouched(fn: OnTouched) {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  toggle() {
    if (this.disabled) {
      return
    }
    this.value = !this.value
    this.onChange(this.value)
    this.onTouched()
  }
}
