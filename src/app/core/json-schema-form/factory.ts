import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

type JsonSchemaType = 'number' | 'string' | 'boolean'


export type JsonPropertyArray = {
  type: 'array',
  items: JsonProperty
}

type JsonProperty = {
  type: JsonSchemaType
  minLength?: number
  format?: string
  minimum?: number,
} | JsonSchema |JsonPropertyArray 

type JsonProperties =  {
  [key: string]: JsonProperty
}

export type JsonSchema = {
  type: 'object',
  properties: JsonProperties,
  required?: string[]
}

@Injectable({
  providedIn: 'root',
})
export class JsonSchemaFormFactory {
  private formBuilder = inject(FormBuilder);

  create(schema: JsonSchema): FormGroup {
    const group: any = {}

    for (let [key, val] of Object.entries(schema.properties)) {
      const validators: ValidatorFn[] = []

      if (schema.required?.includes(key)) {
        validators.push(Validators.required)
      }

      if (val.type == 'string') {
        if (val.minLength) validators.push(Validators.minLength(val.minLength))
        if (val.format == 'email') validators.push(Validators.email)
      }

      if (val.type == 'number') {
        if (val.minimum) validators.push(Validators.min(val.minimum))
      }

      if (val.type == 'array') {
        group[key] = this.formBuilder.array([])
      }
      else if (val.type == 'object') {
        group[key] = this.create(val)
      }
      else {
        group[key] = ['', validators]
      }
    }

    return this.formBuilder.group(group)
  }
}
