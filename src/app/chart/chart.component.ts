import { Component, OnInit } from '@angular/core';
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
  chart = [];
  constructor(private mesureService: MesureService) { }

  ngOnInit() {    
    this.mesureService.getMesure().subscribe(mesures => {
      mesures.forEach(mesure => {
        this.dates.push(moment(mesure.updatedAt).format("DD MMM YYYY HH:mm"));
        this.poids.push(mesure.poids); 
      });
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
    });
  }

  isMobile() {
    return window.screen.width < 1024;
  }

}
