import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, mergeMap, of, startWith, switchMap, tap } from 'rxjs';
import { Users } from '../core/users';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-search',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './user-search.html',
  styleUrl: './user-search.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSearch {
  private usersService = inject(Users)
  private formBuilder = inject(FormBuilder)
  count = 0

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

  readonly loadUsers = toSignal(this.usersService.loadUsers())

  readonly usersList = toSignal(this.searchControl.valueChanges.pipe(
    switchMap((str) => {
      return this.usersService.usersList$.pipe(
        map((usersList) => {
          return usersList.filter(user => user.name.includes(str))
        })
      )
    })
  ), {
    initialValue: []
  })

  readonly filters = toSignal(this.form.get('filters')!.valueChanges, {
    initialValue: {
      city: '',
      company: ''
    }
  })

  readonly users = computed(() => {
    if (!this.valid()) {
      return []
    }
    return this.usersList().filter(user => {
      const matchCity = this.filters().city ? user.address.city.includes(this.filters().city ?? '') : true
      const matchCompany = this.filters().company ? user.company.name.includes(this.filters().company ?? '') : true
      return matchCity && matchCompany
   })
  })

  readonly valid = toSignal(this.searchControl.statusChanges.pipe(
    map(status => status == 'VALID')
  ))
}
