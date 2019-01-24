import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}

  isMobile() {
    return window.screen.width < 1024;
  }

  // isDesktop() {
  //   return window.screen.width >= 1024;
  // }
}
