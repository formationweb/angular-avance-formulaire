import { Component, inject, OnInit } from '@angular/core';
import { User, Users } from '../core/users';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, map, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {
   private usersService = inject(Users)
   private route = inject(ActivatedRoute)
   private formBuilder = inject(FormBuilder)
   
   form = this.formBuilder.group({
     name: '',
     username: '',
     email: ''
   })

   // lecture réactive de l'id -> action
   readonly id$ = this.route.paramMap.pipe(
    map(params => {
      const id = params.get('id') as string
      return +id
    }),
    switchMap((id) => {
      return this.usersService.getUser(id)
    }),
   )

   // synchro store -> form
   readonly user$ = this.usersService.user$.pipe(
     tap((user) => this.form.patchValue(user, {
      emitEvent: false
     }))
   )

   // synchro form -> store
   readonly formChange$ = this.form.valueChanges.pipe(
    startWith(this.form.value),
    tap((formValue) => {
      this.usersService.updateObjectUser(formValue as User)
    })
   )

   vm$ = combineLatest([
     this.id$,
     this.user$,
     this.formChange$
   ]).pipe(
     map(([ id, user, form ]) => {
      return {
        id,
        user,
        form
      }
     })
   )
}
