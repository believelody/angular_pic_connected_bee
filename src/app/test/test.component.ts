import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/test/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  private res: string;

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService
      .getTest()
      .subscribe(res => {
        if (res) {
          console.log('something found');          
          console.log(res);
        } else {
          console.log('nothing retrieve');          
        }
      });    
  }

}
