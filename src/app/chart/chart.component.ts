import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js'
import * as moment from 'moment'
import { MesureService } from '../mesure.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  type: string = 'bar';
  dates: any[] = [];
  poids: number[] = [];
  chart: Chart[] = [];
  mesures: any[] = [];
  @Input('mesures') selectedMesures: any[];
  @Input('selected') selected: boolean;
  constructor(private mesureService: MesureService) { }

  ngOnInit() {
    this.mesureService.getMesureRequest().subscribe(mesures => {
      if (!mesures) {
        this.chart = null;
        return;
      }
      this.mesures = mesures;
      this.initializeDatesAndPoids(this.mesures);
      this.displayChart();
    });
  }

  ngDoCheck() {
    if (this.chart.length > 0) {
      console.log(this.selectedMesures);
      console.log(this.selected);
      if (this.selectedMesures.length === 0 && this.selected) {
        this.fillDatesAndPoids(this.chart, []);
      } else {
        this.fillDatesAndPoids(this.chart, this.selectedMesures);
      }
    }
  }

  isMobile() {
    return window.screen.width < 1024;
  }

  initializeDatesAndPoids(mesures: any[]) {
    let dates: any[] = [];
    let poids: number[] = [];
    mesures.forEach(mesure => {
      if (mesure) {
        dates.push(moment(mesure.updatedAt).format("DD MMM YYYY HH:mm"));
        poids.push(mesure.poids);
      } else {
        poids.push(0);
      }
    });
    if (this.dates !== dates) this.dates = dates;
    if (this.poids !== poids) this.poids = poids;
  }

  fillDatesAndPoids(chart, mesures: any[]) {
    let dates: any[] = [];
    let poids: number[] = [];
    mesures.forEach(mesure => {
      if (mesure) {
        dates.push(moment(mesure.updatedAt).format("DD MMM YYYY HH:mm"));
        poids.push(mesure.poids);
      } else {
        poids.push(0);
      }
    });
    if (this.dates !== dates) this.dates = dates;
    if (this.poids !== poids) this.poids = poids;
    console.log(chart);
    if (chart.length > 0) this.updateChart(chart, dates, poids);
  }

  updateChart(chart, newLabel, newData) {
    chart.data.labels = newLabel;
    chart.data.datasets.forEach(dataset => {
      dataset.data = newData;
    });
    chart.update();
  }

  displayChart() {
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
