import {Component} from '@angular/core';
import {APP_CONFIG} from '../../../core/config/app.config';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {AuthSessionService} from '../../../core/services/auth-session.service';
import {LoaderService} from '../../../core/services/loader.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    NgIf,
    RouterLink,
    NgForOf
  ],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  brandName = APP_CONFIG.brand.name;
  navLinks = APP_CONFIG.nav.links;
  cartCount = 0;

  isLoggedIn = false;
  userName: string | null = null;

  constructor(private router: Router, private authSessionService: AuthSessionService, private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authSessionService.isLoggedIn();
    this.userName = this.authSessionService.getFirstName();
  }

  goLogin() {
    this.router.navigate(['/login']).then(r => false);
  }

  logout() {
    this.loaderService.show();

    setTimeout(() => {
      this.authSessionService.logout();
      this.loaderService.hide();
      window.location.href = '/';
    }, 2000);
  }
}
