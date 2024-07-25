import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'online-shop-frontend';
  "token": any

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
  }

  logout() {
    this.token = null;
    sessionStorage.removeItem('token')
    this.router.navigate([``]).then(() => {
      window.location.reload();
    });
  }
}
