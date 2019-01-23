import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/test/test.service';
import axios from 'axios';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  result: any;

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService
      .getTest()
      .subscribe(
        (res: any) => {
          console.log(res);          
          this.result = (res);
        },
        error => console.log(error));

    // We can also use axios to retrieve our data from netlify lambda functions
    // axios.get('/.netlify/functions/test').then(res => {
    //   this.res = res;
    // });
  }
}
