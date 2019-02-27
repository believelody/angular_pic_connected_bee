import { Component, OnInit } from '@angular/core';
import { RucheService } from '../ruche.service';

@Component({
  selector: 'app-select-ruche',
  templateUrl: './select-ruche.component.html',
  styleUrls: ['./select-ruche.component.scss']
})
export class SelectRucheComponent implements OnInit {
  ruches: any[] = [];
  selected: string = "";
  constructor(private rucheService: RucheService) { }

  ngOnInit() {
    this.rucheService.getRuches().subscribe(ruches => {
      this.ruches = ruches;
      this.selected = ruches[this.ruches.length - 1]._id;
    });
  }
}
