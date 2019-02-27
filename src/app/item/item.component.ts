import { Component, OnInit, Input } from '@angular/core';
import { MesureService } from '../mesure.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  mesuresItem: any[] = [];
  selectDate: Date;
  @Input("mesures") entryMesures: any[];
  @Input("date") entryDate: Date;

  constructor(private mesureService: MesureService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.selectDate !== this.entryDate) {
      this.selectDate = this.entryDate;
      this.mesuresItem = this.mesuresByDate(this.selectDate, this.entryMesures);
    }
  }

  mesuresByDate(date: Date, mesures: any[]) {
    return mesures
      .filter(mesure => {
        let m = new Date(mesure.updatedAt);
        let d = new Date(date);

        if (m.getDate() === d.getDate()) return mesure;
      })
      .map(mesure => mesure);
  }

  isEmpty() {
    return this.mesuresItem.length === 0;
  }

  parseDate(date: string) {
    return new Date(date);
  }
}
