import { Component, OnInit, Input, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js'
import * as moment from 'moment'
import { MesureService } from '../mesure.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { RucheService } from '../ruche.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  ruches: any[] = [];
  id: string = "";
  type: string = 'line';
  dates: any[] = [];
  poids: number[] = [];
  chart = [];
  isChart: boolean = true;
  mesures: any[] = [];
  inputDate: Date;
  max: number = 0;
  avg: number = 0;
  min: number = 0;
  croissance: number = 0;
  @Input('date') selectedDate: Date;
  @Input('selected') selected: boolean;
  @Input('reset') reset: Date;

  constructor(private mesureService: MesureService, private rucheService: RucheService) { }

  ngOnInit() {
    this.rucheService.getRuches().subscribe(ruches => {
      this.ruches = ruches;
      this.id = this.ruches[this.ruches.length - 1]._id;

      this.setMesures(this.id);
    });
  }

  ngDoCheck() {
    // this.mesureService.getMesureRequest().subscribe(mesures => {
    //   if (this.mesures.length !== mesures.length) {
    //     this.mesures = mesures;
    //     this.setDP(this.mesureService.selectDate(this.inputDate, this.mesures));
    //     this.initChart();
    //   }
    // });

    if (!this.isMobile()) {
      if (this.inputDate !== this.selectedDate && this.selected) {
        this.inputDate = this.selectedDate;
        this.setDPC(this.chart, this.mesureService.selectDate(this.inputDate, this.mesures));
      }
    }
  }

  isMobile() {
    return window.screen.width < 1024;
  }

  setRuche() {
    // chart.destroy();
    this.setMesures(this.id);
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

  setMesures(id: string) {
    this.mesureService.getMesureRequest(id).subscribe(mesures => {
      if (!mesures || mesures.length === 0) {
        this.isChart = false;
        return;
      }
      this.isChart = true;
      this.mesures = mesures;

      if (!this.isMobile()) this.inputDate = this.reset;
      else this.inputDate = new Date();
      
      if (this.chart.length > 0) {
        this.setDPC(this.chart, this.mesureService.selectDate(this.inputDate, this.mesures));
      }
      else {
        this.setDP(this.mesureService.selectDate(this.inputDate, this.mesures));
        this.initChart();
      }
    });
  }

  setDP(mesures: any[]) {
    let dates: any[] = [];
    let poids: number[] = [];

    console.log(mesures);

    if (mesures.length > 0) {
      mesures.forEach(mesure => {
        dates.push(moment(mesure.updatedAt).format("DD MMM YYYY HH:mm"));
        poids.push(mesure.poids);
      });
    }

    if (this.dates !== dates) this.dates = dates;
    if (this.poids !== poids) this.poids = poids;

    if (this.poids.length > 0) {
      this.calcMax(this.poids);
      this.calcAvg(this.poids);
      this.calcMin(this.poids);
    }
    else {
      this.max = 0;
      this.avg = 0;
      this.min = 0;}
  }

  setDPC(chart, mesures: any[]) {
    this.setDP(mesures);
    if (chart.length !== 0) this.updateChart(chart, this.dates, this.poids);
  }

  calcMax(tab: number[]) {
    this.max = parseFloat(Math.max(...tab).toFixed(2));
  } 

  calcAvg(tab: number[]) {
    this.avg = parseFloat((tab.reduce((previousValue, currentIndex) => previousValue + currentIndex)/ tab.length).toFixed(2));
  } 

  calcMin(tab: number[]) {
    this.min = parseFloat(Math.min(...tab).toFixed(2));
  } 

  updateChart(chart, newLabel, newData) {
    chart.data.labels = newLabel;
    chart.data.datasets.forEach(dataset => {
      dataset.data = newData;
    });
    chart.update();
  }

  initChart() {
    setTimeout(() => {
      this.chart = new Chart('canvas', {
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
    }, 200);
  }

}
