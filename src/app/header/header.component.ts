import { Component, OnInit, Input } from '@angular/core';
import { ToggleMenuService } from '../service/toggleMenu/toggleMenu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  // @Input('sidenavRef') sidenav: any;
  open: boolean = false;
  constructor(private toggleService: ToggleMenuService) {
    // console.log(this.sidenav);
  }

  ngOnInit() {}

  toggleMenu() {
    this.open = !this.open;
    this.toggleService.toggle(this.open);
  }

  isMobile() {
    return window.screen.width < 1024;
  }

}
