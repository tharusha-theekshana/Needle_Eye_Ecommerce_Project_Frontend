import {Component} from '@angular/core';
import {NavBarComponent} from '../../shared/components/nav-bar/nav-bar.component';
import {TopBannerComponent} from '../../shared/components/top-banner/top-banner.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NavBarComponent, TopBannerComponent, NgIf],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

}
