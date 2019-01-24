import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  @Input('sidenavMobile') sidenav: any;
  constructor() { }

  ngOnInit() {
    // console.log(this.sidenav);
  }

  close() {
    this.sidenav.close();
  }
}
