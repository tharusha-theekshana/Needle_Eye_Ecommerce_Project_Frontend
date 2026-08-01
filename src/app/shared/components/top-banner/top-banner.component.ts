import { Component } from '@angular/core';

@Component({
  selector: 'app-top-banner',
  imports: [],
  standalone : true,
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.css'
})
export class TopBannerComponent {
  title = "Elegant Fashion, Timeless Style";
  description =
    "Beautiful designs, quality fabrics, and perfect fits — our collection brings you fashion that looks great and feels comfortable.";
  image = "assets/images/banner-fashion.png";
}
