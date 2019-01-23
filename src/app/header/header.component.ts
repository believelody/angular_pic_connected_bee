import { Component, OnInit, Input } from '@angular/core';
import { ToggleMenuService } from '../service/toggleMenu/toggleMenu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private toggleService: ToggleMenuService) {}

  ngOnInit() {}
}
