import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  id: number
  name: string
  username: string
  email: string
}

@Injectable({
  providedIn: 'root',
})
export class Users {
  private http = inject(HttpClient)
  readonly url = 'https://jsonplaceholder.typicode.com/users'
  user$ = new BehaviorSubject<User>({} as User)
  usersList$ = new BehaviorSubject<User[]>([])

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id).pipe(
      tap((user) => {
        this.updateObjectUser(user)
      })
    )
  }

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      tap((users) => {
         this.usersList$.next(users)
      })
    )
  }

  updateObjectUser(userObject: User) {
    this.user$.next(userObject)
  }
}
