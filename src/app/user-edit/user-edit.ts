import { Component, inject, OnInit } from '@angular/core';
import { User, Users } from '../core/users';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { UserFormBuilder } from '../core/forms/user-form-builder';
import { ComponentCanDeactivate } from '../guards/pending-changes';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, RouterLink],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit implements ComponentCanDeactivate {
  private usersService = inject(Users);
  private userFormBuilder = inject(UserFormBuilder);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder)

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

  get tags() {
    return this.form.get('tags') as FormArray
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
    console.log(this.form.value);
  }

  addTag() {
     const tagForm = this.formBuilder.group({
      name: '',
      color: ''
     })
     this.tags.push(tagForm)
  }

  removeTag(index: number) {
    this.tags.removeAt(index)
  }

  canDeactivate() {
    return this.form.dirty
  }
}
