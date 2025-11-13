import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonSchema } from '../factory';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-json-form',
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './json-form.html',
  styleUrl: './json-form.css',
})
export class JsonForm {
  @Input({
    required: true
  }) formGroup!: FormGroup 
  @Input({
    required: true
  }) schema!: JsonSchema
  @Output() submitSuccess = new EventEmitter<any>()
  @Output() submitError = new EventEmitter<void>()

  submit() {
    if (this.formGroup.valid) {
      this.submitSuccess.emit(this.formGroup.value)
    }
    else {
      this.submitError.emit()
    }
  }
}
