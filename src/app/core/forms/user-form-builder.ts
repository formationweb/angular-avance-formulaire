import { inject, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User, Users } from '../users';
import { startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserFormBuilder {
  private formBuilder = inject(FormBuilder);
  private usersService = inject(Users);

  // factory
  build() {
    const form = this.formBuilder.group({
      name: '',
      username: '',
      email: '',
      address: this.formBuilder.group({
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: this.formBuilder.group({
          lat: '',
          lng: '',
        }),
      }),
    });

    const user$ = this.usersService.user$.pipe(
      tap((user) =>
        form.patchValue(user, {
          emitEvent: false,
        })
      )
    );

    const formChange$ = form.valueChanges.pipe(
      startWith(form.value),
      tap((formValue) => {
        this.usersService.updateObjectUser(formValue as User);
      })
    );

    return {
      form,
      user$,
      formChange$,
    };
  }
}
