import { Component } from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  "user": User = new User();
  "msg": string

  constructor(private userService: UserService,
              private router: Router,) {
  }

  saveUser() {
    this.userService.saveUser(this.user).subscribe(data => {
      if (data == null){
        this.msg = "Invalid Email"
      }else{
        this.router.navigate([`login`]);
      }
    })
  }

}
