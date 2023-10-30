import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CoinControl-SinUser-Frontend';

  mobileQuery: MediaQueryList;

  constructor( media: MediaMatcher){

    this.mobileQuery = media.matchMedia('(max-widht: 600px)')
  }
}
