import { Component, effect, forwardRef, input, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChange = (value: number) => void
type OnTouched = () => void

@Component({
  selector: 'app-rating-stars',
  imports: [],
  host: {
    role: 'radiogroup',
    tabindex: '0',
    '[aria-disabled]': 'disabled ? "true" : null',
    '(keydown.arrowright)': 'selectNext()'
  },
  template: `
    <ul [class.disabled]="disabled">
      @for (star of stars ; track $index) {
          <li (click)="select($index)" role="radio" [aria-checked]="value == $index+1">⭐</li>
      }
    </ul>
  `,
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingStars),
      multi: true
    },
  ],
  styles: 
    `
      .disabled {
        opacity: 0.5;
      }
    `
  
})
export class RatingStars implements ControlValueAccessor {
  //@Input() max = 5
  max = input(5)

  value = 0
  disabled = false
  onChange: OnChange = () => {}
  onTouched: OnTouched = () => {}

  stars: number[] = []

  constructor() {
    effect(() => {
      this.stars = Array.from({ length: this.max() })
    })
  }
  
  writeValue(value: number) {
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

  select(index: number) {
    if (this.disabled) {
      return
    }
    this.value = index + 1
    this.onChange(this.value)
    this.onTouched()
  }

  selectNext() {
     this.select(this.value)
  }
}
