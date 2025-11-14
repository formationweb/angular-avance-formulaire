import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChange = (value: number[]) => void
type OnTouched = () => void

interface TokenOption {
  id: number
  label: string
}

@Component({
  selector: 'app-token-multi-select',
  imports: [],
  templateUrl: './token-multi-select.html',
  styleUrl: './token-multi-select.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TokenMultiSelect),
      multi: true
    },
  ],
})
export class TokenMultiSelect implements ControlValueAccessor, OnInit {
  @Input() options: TokenOption[] = []
  selectedIds = new Set<number>()
  onChange: OnChange = () => {}
  onTouched: OnTouched = () => {}

  optionsFiltered: TokenOption[] = []

  ngOnInit(): void {
     this.optionsFiltered = this.options
  }

  writeValue(array: number[]): void {
    this.selectedIds = new Set(array)
  }

  registerOnChange(fn: OnChange): void {
    this.onChange = fn
  }

  registerOnTouched(fn: OnTouched): void {
    this.onTouched = fn
  }

  toggleOption(option: TokenOption) {
    if (this.selectedIds.has(option.id)) {
      this.selectedIds.delete(option.id)
    }
    else {
      this.selectedIds.add(option.id)
    }
    this.onTouched()
    this.onChange([...this.selectedIds])
  }

  filterOptions(event: any) {
    const value = event?.target?.value
    this.optionsFiltered = this.options.filter(option => option.label.includes(value))
  }

  get selectedOptions() {
    return this.options.filter(option => this.selectedIds.has(option.id))
  }
}
