import { Component, inject } from '@angular/core';
import { JsonForm } from '../../core/json-schema-form/json-form/json-form';
import { JsonSchema, JsonSchemaFormFactory } from '../../core/json-schema-form/factory';

@Component({
  selector: 'app-json-schema-test',
  imports: [JsonForm],
  template: `
    <app-json-form 
      [schema]="userSchema" 
      [formGroup]="form" 
      (submitSuccess)="createUser($event)"
      (submitError)="createUserError()"
      >
       <button>Valider</button>
    </app-json-form>
  `
})
export class JsonSchemaTest {
  private jsonSchemaFactory = inject(JsonSchemaFormFactory)

  userSchema: JsonSchema = {
    type: 'object',
    properties: {
      name:      { type: 'string', minLength: 2 },
      email:     { type: 'string', format: 'email' },
      age:       { type: 'number', minimum: 18 }
    },
    required: ['name', 'email']
  };

  form = this.jsonSchemaFactory.create(this.userSchema)

  createUser(value: any) {
    console.log(value)
  }

  createUserError() {
    console.log('erreur')
  }
}
