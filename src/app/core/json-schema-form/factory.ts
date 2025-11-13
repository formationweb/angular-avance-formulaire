import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

type JsonSchemaType = 'object' | 'number' | 'string'

export type JsonSchema = {
  type: 'object',
  properties: {
    [key: string]: {
      type: JsonSchemaType
      minLength?: number
      format?: string
      minimum?: number
    }
  },
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

      group[key] = ['', validators]
    }

    return this.formBuilder.group(group)
  }
}
