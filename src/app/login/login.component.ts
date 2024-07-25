import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {User} from "../user";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  "user": User = new User();
  "msg": string;

  constructor(private userService: UserService,
              private router: Router,) {
  }

  login() {
    this.userService.login(this.user).subscribe(data => {
      if (data != null) {
        sessionStorage.setItem("token", data.token.toString());
        this.router.navigate([`products`]).then(() => {
          window.location.reload();
        });
      } else {
        this.msg = "Login failed";
      }
    })
  }

}
