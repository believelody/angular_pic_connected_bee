import { Component, ViewChild, Input } from '@angular/core';
import { ToggleMenuService } from './service/toggleMenu/toggleMenu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pic-connected-bee';
  opened: boolean = false;
  @ViewChild('sidenav') sidenav: any;

  constructor() {
    console.log(this.sidenav);
  }

  ngOnInit() {}

  isMobile() {
    this.opened = false;
    return window.screen.width < 1024;
  }

  isDesktop() {
    this.opened = true;
    return window.screen.width >= 1024;
  }
}
