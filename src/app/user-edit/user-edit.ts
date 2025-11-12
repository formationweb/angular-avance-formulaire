import { Component, inject, OnInit } from '@angular/core';
import { User, Users } from '../core/users';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { UserFormBuilder } from '../core/forms/user-form-builder';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {
  private usersService = inject(Users);
  private userFormBuilder = inject(UserFormBuilder);
  private route = inject(ActivatedRoute);

  vm$: Observable<any>;
  form: FormGroup;

  constructor() {
    const { form, user$, formChange$ } = this.userFormBuilder.build();
    this.form = form;
    this.vm$ = combineLatest([this.id$, user$, formChange$]).pipe(
      map(([id, user, form]) => {
        return {
          id,
          user,
          form,
        };
      })
    );
  }

  // lecture réactive de l'id -> action
  readonly id$ = this.route.paramMap.pipe(
    map((params) => {
      const id = params.get('id') as string;
      return +id;
    }),
    switchMap((id) => {
      return this.usersService.getUser(id);
    })
  );
  
  edit() {
    console.log(this.form.get('address.geo'));
  }
}
