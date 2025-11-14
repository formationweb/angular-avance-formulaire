import { Component, computed, forwardRef, input, Input, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChange = (value: number[]) => void
type OnTouched = () => void

interface TokenOption {
  id: number
  label: string
}

@Component({
  selector: 'app-token-multi-select',
  imports: [FormsModule],
  templateUrl: './token-multi-select.html',
  styleUrl: './token-multi-select.css',
  host: {
    role: 'listbox',
    tabindex: '0',
    '(keydown.arrowdown)': 'highlightNext()',
    '(keydown.arrowup)': 'highlightPrevious()',
    '(keydown.enter)': 'highlightSelected()'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TokenMultiSelect),
      multi: true
    },
  ],
  styles: `
    .hightlight {
      background-color: blue;
    }
  `
})
export class TokenMultiSelect implements ControlValueAccessor {
  //@Input() options: TokenOption[] = []
  options = input<TokenOption[]>([])
  selectedIds = signal(new Set<number>())

  highlightedIndex = signal(0)
  searchOption = signal('')

  optionsFiltered = computed(() => {
    return this.options().filter(option => option.label.includes(this.searchOption()))
  })

  onChange: OnChange = () => {}
  onTouched: OnTouched = () => {}

  writeValue(array: number[]): void {
    this.selectedIds.set(new Set(array))
  }

  registerOnChange(fn: OnChange): void {
    this.onChange = fn
  }

  registerOnTouched(fn: OnTouched): void {
    this.onTouched = fn
  }

  toggleOption(option: TokenOption) {
    if (this.selectedIds().has(option.id)) {
      this.selectedIds().delete(option.id)
    }
    else {
      this.selectedIds().add(option.id)
    }
    this.onTouched()
    this.onChange([...this.selectedIds()])
  }

  get selectedOptions() {
    return this.options().filter(option => this.selectedIds().has(option.id))
  }

  // selectedOptions = computed(() => {
  //   return this.options().filter(option => this.selectedIds().has(option.id))
  // })

  highlightNext() {
    const length = this.optionsFiltered().length
    if (!length) {
      return
    }
    const next = (this.highlightedIndex() + 1) % length
    this.highlightedIndex.set(next)
  }

  highlightPrevious() {
    const length = this.optionsFiltered().length
    if (!length) {
      return
    }
    const next = (this.highlightedIndex() - 1 + length) % length
    this.highlightedIndex.set(next)
  }

  highlightSelected() {
    this.toggleOption(this.optionsFiltered()[this.highlightedIndex()])
  }
}
