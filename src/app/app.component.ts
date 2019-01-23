import { Component } from '@angular/core';
import { ToggleMenuService } from './service/toggleMenu/toggleMenu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pic-connected-bee';

  constructor() {}

  ngOnInit() {
  }

  isMobile() {
    return window.screen.width < 1024;
  }
}
