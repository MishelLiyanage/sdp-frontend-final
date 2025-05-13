import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'sdp-frontend-final';

  constructor(private router: Router,
    private loginService: LoginService
  ) {
  }

  // ngOnInit(): void {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationStart) {
  //       if (!this.loginService.isLoggedIn() && event.url !== '/login') {
  //         this.router.navigate(['/login']);
  //       }
  //     }
  //   });
  // }
}
