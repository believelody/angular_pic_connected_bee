import { Component } from '@angular/core';
import { ToggleMenuService } from './service/toggleMenu/toggleMenu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pic-connected-bee';
  isOpened: boolean = true;
  sidenavElement: any;

  constructor(private toggleService: ToggleMenuService) {
    this.isOpened = window.screen.width >= 1024;
    this.sidenavElement = document.getElementById('sidenav');
    console.log(this.sidenavElement);    
  }

  ngOnInit() {
  }


}
