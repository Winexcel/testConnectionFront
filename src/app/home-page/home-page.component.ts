import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TestsService} from '../shared/services/tests.service';
import {Test} from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  currentTest: Test;
  tickTimer = null;

  constructor(private testsService: TestsService) {
  }

  ngOnInit(): void {
    this.testsService.getTest().subscribe((test: Test) => {
      this.currentTest = test;

      if (!test.isCompleted) {
        this.startTickTimer();
      }

    });
  }

  onStartTest() {
    this.testsService.startTest(5).subscribe((test: Test) => {
      console.log(test);
      this.currentTest = test;
      this.startTickTimer();
    });
  }

  startTickTimer() {
    this.tickTimer = setInterval(this.onTick.bind(this), 1000);
  }

  stopTickTimer() {
    clearInterval(this.tickTimer);
  }

  onTick() {
    this.testsService.tick().subscribe((test: Test) => {
      this.currentTest = test;

      if (this.currentTest.isCompleted) {
        this.stopTickTimer();
      }
    });
  }

  onFinishTest() {
    this.testsService.finishTesh().subscribe(test => {
      this.currentTest = test;
    });
  }
}
