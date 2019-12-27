import { Component } from '@angular/core';
import { asapScheduler, asyncScheduler, queueScheduler, from } from "rxjs";
import { filter, map, observeOn } from "rxjs/operators";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Observable Schedulers';
  observable$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9]).pipe(
    filter(num => num % 2 === 0 && num > 4),
    map(x => x * 2)
  );

  messages: string[] = [];

  constructor() {

    /**
     * Which [Scheduler] will produce the results in the correct sequence?
    */


    this.messages.push("asyncScheduler:START");
    this.messages.push("asyncScheduler: 0");
    this.observable$.pipe(observeOn(asyncScheduler)).subscribe(item => {
      this.messages.push("asyncScheduler: " + item);
    });
    this.messages.push("asyncScheduler: 99");
    this.messages.push("asyncScheduler:END");

    this.messages.push("asapScheduler:START");
    this.messages.push("asapScheduler: 0");
    this.observable$.pipe(observeOn(asapScheduler)).subscribe(item => {
      this.messages.push("asapScheduler: " + item);
    });
    this.messages.push("asapScheduler: 99");
    this.messages.push("asapScheduler:END");

    this.messages.push("queueScheduler:START");
    this.messages.push("queueScheduler: 0");
    this.observable$.pipe(observeOn(queueScheduler)).subscribe(item => {
      this.messages.push("queueScheduler: " + item);
    });
    this.messages.push("queueScheduler: 99");
    this.messages.push("queueScheduler:END");

  }
}
