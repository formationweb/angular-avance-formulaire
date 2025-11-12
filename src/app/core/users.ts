import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id)
  }
}
