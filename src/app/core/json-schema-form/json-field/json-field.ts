import { Component, inject, Input } from '@angular/core';
import { JsonPropertyArray, JsonSchema, JsonSchemaFormFactory } from '../factory';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-json-field',
  imports: [KeyValuePipe, ReactiveFormsModule],
  templateUrl: './json-field.html',
  styleUrl: './json-field.css',
})
export class JsonField {
  private jsonSchemaFactory = inject(JsonSchemaFormFactory) 

  @Input({
    required: true
  }) schema!: JsonSchema
  @Input({
    required: true
  }) control!: AbstractControl

  get formGroup() {
    return this.control as FormGroup
  }

  get formControl() {
    return this.control as FormControl
  }

  get formArray() {
    return this.control as FormArray
  }

  isFormGroup() {
    return this.control instanceof FormGroup
  }

  isFormControl() {
    return this.control instanceof FormControl
  }

  isFormArray() {
    return this.control instanceof FormArray
  }

  addEntry() {
     const formGroup = this.jsonSchemaFactory.create((this.schema as any).items)
     this.formArray.push(formGroup)
  }
}
