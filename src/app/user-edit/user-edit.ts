import { Component, inject } from '@angular/core';
import { User, Users } from '../core/users';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {
   private usersService = inject(Users)
   private route = inject(ActivatedRoute)
   private formBuilder = inject(FormBuilder)
   user: User = {} as User
   form = this.formBuilder.group({
     name: '',
     username: '',
     email: ''
   })

   constructor() {
      const id = +this.route.snapshot.params['id']
      this.usersService.getUser(id).subscribe((user) => {
        this.user = user
        this.form.patchValue(user)
      })
   }
}
