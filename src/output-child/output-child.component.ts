import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-output-child',
  templateUrl: './output-child.component.html',
  styleUrls: ['./output-child.component.css']
})
export class OutputChildComponent {

  constructor() { }

 @Output() countVal = new EventEmitter()
    counter = 0;
    setCount() { // You can give any function name
        this.counter = this.counter + 1;
        this.countVal.emit(this.counter);
    }

}