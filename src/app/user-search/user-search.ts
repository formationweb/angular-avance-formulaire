import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, of, startWith, switchMap, tap } from 'rxjs';
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
  searchControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  readonly result$ = this.searchControl.valueChanges.pipe(
    switchMap((str) => {
      return this.usersService.usersList$.pipe(
        map((usersList) => {
          return usersList.filter(user => user.name.includes(str))
        })
      )
    })
  )

  readonly valid$ = this.searchControl.statusChanges

  readonly resultValid$ = this.valid$.pipe(
    switchMap((valid) => valid == 'VALID' ? this.result$ : of([]))
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
