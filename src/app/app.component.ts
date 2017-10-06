import { Component } from '@angular/core';
import {DragulaService} from "ng2-dragula";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  testArr1 = [
    {id: 0 , name: '1.1', orderIndex: 0},
    {id: 1 , name: '1.2', orderIndex: 1},
    {id: 2 , name: '1.3', orderIndex: 2},
    {id: 3 , name: '1.4', orderIndex: 3},
    {id: 4 , name: '1.5', orderIndex: 4},
  ];
  movedObj = {
    startValue: '',
    startId: 0,
    endId: 0,
    startPlace: '',
    endPlace: '',
  }
  constructor(private dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value) => {

      this.testArr1.forEach(res => {
        if (res.id == value[1].id) {
          this.movedObj.startId = res.id;
          this.movedObj.startValue = res.name;
        }
        });
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
        console.log('values', value);
        this.testArr1.forEach(res => {
          if (res.id == value[4].id) {
            this.movedObj.endId = res.id -1;
          }
        });
      this.testArr1.splice(this.movedObj.startId, 1);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  private onDrag(args) {
    let [e, el] = args;
    // do something
  }

  private onDrop(args) {
    for (let i = 0; i < this.testArr1.length; i++) {
    if (this.testArr1[i].orderIndex >= this.movedObj.endId) {
      this.testArr1[i].orderIndex ++;
    } else if (this.testArr1[i].orderIndex < this.movedObj.startId || this.testArr1[i].orderIndex == this.movedObj.endId) {
      this.testArr1[i].orderIndex --;
    }
    }
    this.testArr1.push({id: this.movedObj.startId, name: this.movedObj.startValue, orderIndex: this.movedObj.endId});
    this.testArr1.sort(function (a, b) {
      return a.orderIndex - b.orderIndex;
    });
  }

  private onOver(args) {
    let [e, el, container] = args;
    // do something
  }

  private onOut(args) {
    let [e, el, container] = args;
    // do something
  }
}
