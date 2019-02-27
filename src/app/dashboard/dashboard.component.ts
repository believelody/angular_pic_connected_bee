import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDate, NgbDateNativeAdapter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MesureService } from '..//mesure.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class DashboardComponent implements OnInit {
  title: string = "Dashboard";
  date: Date;
  mesures: any[] = [];
  ngbDate: NgbDate;
  selected: boolean = false;
  constructor(private mesureService: MesureService, calendar: NgbCalendar) { }

  ngOnInit() {
    this.date = this.today;
  }

  dateSelect(date: Date) {
    this.date = date;
    this.selected = true;
  }

  isMobile() {
    return window.screen.width < 1024;
  }

  get today() {
    return new Date();
  }

  backToday() {
    this.date = this.today;
    this.selected = false;
  }

}
