import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js'
import * as moment from 'moment'
import { MesureService } from '../mesure.service';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  type: string = 'line';
  dates: any[] = [];
  poids: number[] = [];
  chart = [];
  mesures: any[] = [];
  inputDate: Date;
  @Input('mesures') selectedMesures: any[];
  @Input('selected') selected: boolean;
  @Input('reset') reset: Date;
  constructor(private mesureService: MesureService) { }

  ngOnInit() {
    this.mesureService.getMesureRequest().subscribe(mesures => {
      if (!mesures) {
        this.chart = null;
        return;
      }
      this.mesures = mesures;

      if (!this.isMobile()) this.inputDate = this.reset;
      else this.inputDate = new Date();

      this.setDP(this.mesureService.selectDate(this.inputDate, this.mesures));
      this.initChart();
    });
  }

  ngDoCheck() {
    this.mesureService.getMesureRequest().subscribe(mesures => {
      if (this.mesures.length !== mesures.length) {
        this.mesures = mesures;
        this.setDP(this.mesureService.selectDate(this.inputDate, this.mesures));
        this.initChart();
      }
    });

    if (!this.isMobile()) {
      if (this.selectedMesures.length === 0 && this.selected) {
        this.setDPC(this.chart, []);
      } else if (this.selectedMesures.length > 0) {
        this.setDPC(this.chart, this.selectedMesures);
      }
    }
  }

  backToday() {
    this.inputDate = new Date();
    this.setDPC(this.chart, this.mesureService.selectDate(this.inputDate, this.mesures));
  }

  dateSelect(type: String, event: MatDatepickerInputEvent<Date>) {
    this.setDPC(this.chart, this.mesureService.selectDate(event.value, this.mesures));
  }

  toggleType(chart) {
    chart.destroy()
    this.type = this.type === 'line' ? 'bar' : 'line';
    this.initChart();
  }

  isMobile() {
    return window.screen.width < 1024;
  }

  setDP(mesures: any[]) {
    let dates: any[] = [];
    let poids: number[] = [];
    console.log(mesures);
    mesures.forEach(mesure => {
      if (mesure) {
        dates.push(moment(mesure.updatedAt).format("DD MMM YYYY HH:mm"));
        poids.push(mesure.poids);
      }
    });
    if (this.dates !== dates) this.dates = dates;
    if (this.poids !== poids) this.poids = poids;
  }

  setDPC(chart, mesures: any[]) {
    this.setDP(mesures);
    if (chart.length !== 0) this.updateChart(chart, this.dates, this.poids);
  }

  updateChart(chart, newLabel, newData) {
    chart.data.labels = newLabel;
    chart.data.datasets.forEach(dataset => {
      dataset.data = newData;
    });
    chart.update();
  }

  initChart() {
    this.chart = new Chart('chart', {
      type: this.type,
      data: {
        labels: this.dates,
        datasets: [
          {
            data: this.poids,
            backgroundColor: "#ffcc00",
            borderColor: this.type === 'line' ? "#3cba9f" : "",
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

}
