import { Component } from '@angular/core';
import {DragulaService} from "ng2-dragula";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  testArr1 = [
    {id: 0 , value: '1.1', orderIndex: 0},
    {id: 1 , value: '1.2', orderIndex: 1},
    {id: 2 , value: '1.3', orderIndex: 2},
    {id: 3 , value: '1.4', orderIndex: 3},
    {id: 4 , value: '1.5', orderIndex: 4},
    {id: 5 , value: '1.6', orderIndex: 5},
    {id: 6 , value: '1.7', orderIndex: 6},
    {id: 7 , value: '1.8', orderIndex: 7},
    {id: 8 , value: '1.9', orderIndex: 8},
    {id: 9 , value: '1.10', orderIndex: 9},
    {id: 10 , value: '1.11', orderIndex: 10},
    {id: 11 , value: '1.12', orderIndex: 11},
  ];
  movedObj = {
    value: '',
    id: 0,
    startPos : 0,
    endPos: 0,
    orderIndex : 0,
    startPlace: '',
    endPlace: '',
  }
  constructor(private dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value) => {

      this.testArr1.forEach(res => {
        if (res.id == value[1].id) {
          console.log('result', res);
          this.movedObj.id = res.id;
          this.movedObj.value = res.value;
          this.movedObj.startPos = res.orderIndex;
        }
        });
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log('vallll', value);
      this.testArr1.forEach(res => {
        console.log('res', res);
        if (res.id == value[4].id) {
          this.movedObj.endPos = res.orderIndex;
          this.movedObj.orderIndex = res.orderIndex - 1;
        }
      });
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
    if (this.movedObj.startPos < this.movedObj.endPos) {
      for (let i = this.movedObj.startPos ; i < this.testArr1.length ; i++) {
        if (this.testArr1[i].orderIndex <= this.movedObj.orderIndex && this.testArr1[i].orderIndex !== 0) {
          console.log('works')
          this.testArr1[i].orderIndex --;
        }
      }
      this.testArr1.splice(this.movedObj.startPos, 1);
      this.testArr1.push({id: this.movedObj.id, value: this.movedObj.value, orderIndex: this.movedObj.orderIndex});
      this.testArr1.sort(function (a, b) {
        return a.orderIndex - b.orderIndex;
      });
    }
    if (this.movedObj.startPos > this.movedObj.endPos) {
      console.log('idem snizu v verh');
      for (let i = this.movedObj.endPos; i < this.movedObj.startPos; i++) {
        console.log('nijnie logi', this.testArr1[i]);
        if (this.testArr1[i].orderIndex >= this.movedObj.orderIndex && this.testArr1[i].orderIndex !== this.testArr1.length - 1) {
          this.testArr1[i].orderIndex ++;
        }
      }
      this.testArr1.splice(this.movedObj.startPos, 1);
      this.testArr1.push({id: this.movedObj.id, value: this.movedObj.value, orderIndex: this.movedObj.orderIndex + 1});
      this.testArr1.sort(function (a, b) {
        return a.orderIndex - b.orderIndex;
      });
    }

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
