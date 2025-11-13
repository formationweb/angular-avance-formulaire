import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, mergeMap, of, startWith, switchMap, tap } from 'rxjs';
import { Users } from '../core/users';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-search',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './user-search.html',
  styleUrl: './user-search.css',
})
export class UserSearch {
  private usersService = inject(Users)
  private formBuilder = inject(FormBuilder)

  form = this.formBuilder.group({
    query: ['', {
      validators: [
        Validators.required,
        Validators.minLength(3)
      ],
      nonNullable: true
    }],
    filters: this.formBuilder.group({
      city: '',
      company: ''
    })
  })
  
  get searchControl() {
    return this.form.get('query') as FormControl<string>
  }

  readonly query$ = this.searchControl.valueChanges.pipe(
    switchMap((str) => {
      return this.usersService.usersList$.pipe(
        map((usersList) => {
          return usersList.filter(user => user.name.includes(str))
        })
      )
    })
  )

  readonly filters$ = this.form.get('filters')!.valueChanges.pipe(
    startWith( this.form.get('filters')!.value)
  )

  readonly result$ = combineLatest([ this.query$, this.filters$]).pipe(
      map(([ usersList, filters ]) => {
         return usersList.filter(user => {
            const matchCity = filters.city ? user.address.city.includes(filters.city) : true
            const matchCompany = filters.company ? user.company.name.includes(filters.company) : true
            return matchCity && matchCompany
         })
      })
  )

  readonly valid$ = this.searchControl.statusChanges

  readonly resultValid$ = this.valid$.pipe(
    mergeMap((valid) => valid == 'VALID' ? this.result$ : of([]))
  )

  readonly vm$ = combineLatest([
    this.resultValid$,
    this.usersService.loadUsers()
  ]).pipe(
    map(([results]) => {
      return {
        results
      }
    })
  )
}
