import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class DashboardComponent implements OnInit {
  title: string = "Dashboard";
  date: Date;
  constructor() { }

  ngOnInit() {
    this.date = this.today;
  }

  dateSelect(e: Date) {
    console.log(e);
    // this.selectDate = JSON.stringify(e);    
  }

  get today() {
    return new Date();
  }

}
